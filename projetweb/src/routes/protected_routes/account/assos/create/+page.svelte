<script lang="ts">
	import { page } from '$app/stores';
	import { supabase } from '$lib/supabaseClient';
	import { onMount } from 'svelte';

	let user = $page.data.session.user;

	let name_asso: string = '';
	let photo_asso: string | null = null;
	let description_asso: string | null = null;
	let member: boolean = false;

	let files: FileList;
	let url_photo_asso: string | null = null;

	let loading = false;
	let created = false;
	let uploading = false;

	async function handleSubmit() {
		try {
			loading = true;
			let { error } = await supabase.from('association').insert({
				name_association: name_asso,
				photo_url: photo_asso ? photo_asso : null,
				description: description_asso ? description_asso : null
			});

			if (error) throw error;

			try {
				const { data, error } = await supabase.from('post').insert({
					association: name_asso,
					title: `L'association ${name_asso} a été créée !`,
					content: `L'association ${name_asso} a été créée par ${user.email} !`,
					id_author: user.id
				});
			} catch (error) {
				if (error instanceof Error) {
					alert(error.message);
				}
			}

			if (member) {
				try {
					const id: string = await getId();
					const { data, error } = await supabase
						.from('members')
						.insert({ id_user: user.id, id_asso: id });
				} catch (error) {
					if (error instanceof Error) {
						alert(error.message);
					}
				}
			}
		} catch (error) {
			if (error instanceof Error) {
				alert(error.message);
			}
		} finally {
			loading = false;
			created = true;
		}
	}

	// Get id of the new association
	const getId = async () => {
		try {
			uploading = true;
			const { data, error } = await supabase
				.from('association')
				.select('id')
				.eq('name_association', name_asso)
				.single();

			if (error) throw error;
			return data.id;
		} catch (error) {
			if (error instanceof Error) {
				alert(error.message);
			}
		} finally {
			uploading = false;
		}
	};

	// Upload a logo for the association
	const uploadLogo = async () => {
		if (!created) throw new Error('Association not created');

		try {
			uploading = true;

			const logoFile = files[0];
			const id: string = await getId();
			const { data, error } = await supabase.storage
				.from('logos')
				.upload(`${id}/logo_${logoFile.name}`, logoFile, {
					cacheControl: '3600',
					upsert: true
				});

			if (data) {
				photo_asso = `logo_${logoFile.name}`;
				try {
					const { data, error } = await supabase
						.from('association')
						.update({ photo_url: photo_asso })
						.eq('id', id);
					if (error) throw error;
				} catch (error) {
					if (error instanceof Error) {
						alert(error.message);
					}
				}
			}

			if (error) throw error;
		} catch (error) {
			if (error instanceof Error) {
				alert(error.message);
			}
		} finally {
			dowloadLogo();
			uploading = false;
		}
	};

	// Download the user's photo from the database
	const dowloadLogo = async () => {
		if (photo_asso) {
			try {
				const logoFile = files[0];
				const id = await getId();
				const { data, error } = await supabase.storage
					.from('logos')
					.download(`${id}/logo_${logoFile.name}`);

				if (error) throw error;

				if (data) {
					url_photo_asso = URL.createObjectURL(data);
				}
			} catch (error) {
				if (error instanceof Error) {
					alert(error.message);
				}
			}
		}
	};
</script>

<div id="back-button">
	<a id="return" href="/protected_routes/account/assos">
		<button id="button1" class="button buttonPerso3 block primary"> &lt Retour</button>
	</a>
</div>

<div class="myTitle" style="background-color: var(--custom-color2)">
	<div class="myTitle-text">
		<h1>Créer une association</h1>
	</div>
</div>
<div class="myBody">
	<div class="myBody-text">
		{#if !created}
			<form id="createAssoForm" on:submit|preventDefault={handleSubmit}>
				<div class="form-widget">
					<div>
						<label for="name_asso">Nom de l'asso</label>
						<input
							class="inputField"
							type="name_asso"
							placeholder={name_asso}
							bind:value={name_asso}
						/>
						<label for="description_asso">Description</label>
						<input
							class="inputField"
							type="description_asso"
							placeholder={description_asso}
							bind:value={description_asso}
						/>
						<label>
							Devenir un membre de cette asso ?
							<input type="checkbox" bind:checked={member} />
						</label>
					</div>
					<div>
						<input
							type="submit"
							class="button block primary"
							value={loading ? 'Loading' : 'Create'}
							disabled={loading}
						/>
					</div>
				</div>
			</form>
		{:else}
			<form class="row flex-center flex">
				<h2>L'association {name_asso} a été créée</h2>
			</form>
			{#if !url_photo_asso}
				<div class="body">
					<label class="button primary block" for="single">
						{uploading ? 'Uploading ...' : 'Add a logo'}
					</label>
					<span style="display:none">
						<input
							type="file"
							id="single"
							accept="image/*"
							bind:files
							on:change={uploadLogo}
							disabled={uploading}
						/>
					</span>
				</div>
			{:else}
				<div class="row flex-center flex">
					<img src={url_photo_asso} alt="Logo de l'association" />
				</div>
			{/if}
		{/if}
	</div>
</div>

<style>
	#createAssoForm {
		padding: 0 10%;
	}
	/* for return button */
	#back-button {
		z-index: 5;
		position: absolute;
		left: 12%;
		top: 30%;
		margin: 1rem;
		width: fit-content;
	}

	#return {
		text-decoration: none;
	}

	#button1 {
		display: flex;
		align-items: center;
		justify-content: center;
		border: 1px solid var(--custom-color1);
		background-color: var(--custom-color1);
		text-transform: none !important;
		transition: all 0.2s ease;
	}

	#button1:hover {
		background-color: #2a2a2a;
		border: 1px solid var(--custom-color1);
	}
</style>
