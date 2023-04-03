<script lang="ts">
	import { page } from '$app/stores';
	import { supabase } from '$lib/supabaseClient';
	import { onMount } from 'svelte';

	export let data;

	let association = data.association;

	let name_association: string | null = null;

	let files: FileList;
	let url_photo: string | null = null;
	let logo: string | null = null;
	let new_logo: string | null = null;

	let loading = false;
	let uploading = false;
	let downloading = false;
	let deleting = false;

	onMount(() => {
		getData();
	});

	// GET the association's logo from the database
	const getData = async () => {
		try {
			loading = true;

			let { data, error } = await supabase
				.from('association')
				.select('name_association, photo_url')
				.eq('id', association.id)
				.single();

			if (data) {
				name_association = data.name_association;
				logo = data.photo_url;
			}

			if (error) throw error;
		} catch (error) {
			if (error instanceof Error) {
				alert(error.message);
			}
		} finally {
			loading = false;
			dowloadLogo();
		}
	};

	// Upload the association's logo from its file
	const uploadAvatar = async () => {
		try {
			uploading = true;

			const avatarFile = files[0];
			const { data, error } = await supabase.storage
				.from('logos')
				.upload(`${association.id}/avatar_${avatarFile.name}`, avatarFile, {
					cacheControl: '3600',
					upsert: true
				});

			if (data) {
				new_logo = `avatar_${avatarFile.name}`;
			}
			updateLogo();

			if (error) throw error;
		} catch (error) {
			if (error instanceof Error) {
				alert(error.message);
			}
		} finally {
			uploading = false;
		}
	};

	// Update the association's logo in the database
	const updateLogo = async () => {
		try {
			uploading = true;
			let { error } = await supabase
				.from('association')
				.update({ photo_url: new_logo ? new_logo : logo })
				.eq('id', association.id);

			if (error) throw error;
		} catch (error) {
			if (error instanceof Error) {
				alert(error.message);
			}
		} finally {
			uploading = false;
			getData();
		}
	};

	// Download the association's logo from the database
	const dowloadLogo = async () => {
		if (logo) {
			try {
				downloading = true;
				const { data, error } = await supabase.storage
					.from('logos')
					.download(`${association.id}/${logo}`);

				if (data) {
					url_photo = URL.createObjectURL(data);
				}

				if (error) throw error;
			} catch (error) {
				if (error instanceof Error) {
					alert(error.message);
				}
			} finally {
				downloading = false;
			}
		}
	};

	// Delete the user's photo (only in the user's table)
	const deleteLogo = async () => {
		try {
			deleting = true;
			let { error } = await supabase
				.from('association')
				.update({ photo_url: null })
				.eq('id', association.id);

			logo = null;
			new_logo = null;
			url_photo = null;

			if (error) throw error;
		} catch (error) {
			if (error instanceof Error) {
				alert(error.message);
			}
		} finally {
			deleting = false;
			getData();
		}
	};
</script>

<div id="back-button">
	<a id="return" href="/protected_routes/association">
		<button id="button1" class="button buttonPerso3 block primary"> &lt Retour</button>
	</a>
</div>

<div class="myTitle" style="background-color: var(--custom-color3)">
	<div class="myTitle-text">
		<h1 class="header">Changer la photo de l'asso</h1>
	</div>
</div>
<div class="myBody">
	<div class="myBody-text">
		<div class="row">
			<div class="column">
				{#if url_photo}
					<div class="avatar image flex-center">
						<img
							src={url_photo}
							alt={downloading ? 'Downloading ...' : ''}
							class="avatar image flex-center"
							style="padding-left: 30%;"
						/>
					</div>
				{/if}
			</div>
			<div class="column">
				<div class="body">
					<label class="button buttonPerso2 block" for="single">
						{uploading ? 'Uploading ...' : 'Télécharger une nouvelle photo'}
					</label>
					<span style="display:none">
						<input
							type="file"
							id="single"
							accept="image/*"
							bind:files
							on:change={uploadAvatar}
							disabled={uploading}
						/>
					</span>
				</div>

				<div class="body">
					<button class="button buttonPerso4 block" on:click={deleteLogo}
						>{deleting ? 'Deleting ...' : 'Supprimer la photo'}</button
					>
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	.row {
		display: flex;
		/* margin-bottom: 1.2rem; */
	}

	.column {
		flex: 80%;
	}

	img {
		max-width: 100%;
		height: auto;
	}
	/* for return button */
	#back-button {
		z-index: 5;
		position: absolute;
		left: 20%;
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
