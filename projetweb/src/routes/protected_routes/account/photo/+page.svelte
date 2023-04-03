<script lang="ts">
	import { page } from '$app/stores';
	import { supabase } from '$lib/supabaseClient';
	import { onMount } from 'svelte';

	let user = $page.data.session.user;

	let first_name: string | null = null;
	let last_name: string | null = null;

	let files: FileList;
	let url_photo: string | null = null;
	let photo: string | null = null;
	let new_photo: string | null = null;

	let loading = false;
	let uploading = false;
	let downloading = false;
	let deleting = false;

	onMount(() => {
		getData();
	});

	// GET the user's photo from the database
	const getData = async () => {
		try {
			loading = true;

			let { data, error } = await supabase
				.from('users')
				.select('first_name, last_name, photo')
				.eq('id', user.id)
				.single();

			if (data) {
				first_name = data.first_name;
				last_name = data.last_name;
				photo = data.photo;
			}

			if (error) throw error;
		} catch (error) {
			if (error instanceof Error) {
				alert(error.message);
			}
		} finally {
			loading = false;
			dowloadPhoto();
		}
	};

	// Upload the user's photo from its file
	const uploadAvatar = async () => {
		try {
			uploading = true;

			const avatarFile = files[0];
			const { data, error } = await supabase.storage
				.from('avatars')
				.upload(`${user.id}/avatar_${avatarFile.name}`, avatarFile, {
					cacheControl: '3600',
					upsert: true
				});

			if (data) {
				new_photo = `avatar_${avatarFile.name}`;
			}
			updatePhoto();

			if (error) throw error;
		} catch (error) {
			if (error instanceof Error) {
				alert(error.message);
			}
		} finally {
			uploading = false;
		}
	};

	// Update the user's photo in the database
	const updatePhoto = async () => {
		try {
			uploading = true;
			let { error } = await supabase
				.from('users')
				.update({ photo: new_photo ? new_photo : photo })
				.eq('id', user.id);

			if (error) throw error;
			emptyStorage(photo);
		} catch (error) {
			if (error instanceof Error) {
				alert(error.message);
			}
		} finally {
			uploading = false;
			getData();
		}
	};

	// Download the user's photo from the database
	const dowloadPhoto = async () => {
		if (photo) {
			try {
				downloading = true;
				const { data, error } = await supabase.storage
					.from('avatars')
					.download(`${user.id}/${photo}`);

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
	const deletePhoto = async () => {
		try {
			deleting = true;
			let { error } = await supabase.from('users').update({ photo: null }).eq('id', user.id);

			photo = null;
			new_photo = null;
			url_photo = null;

			if (error) throw error;
			emptyStorage(photo);
		} catch (error) {
			if (error instanceof Error) {
				alert(error.message);
			}
		} finally {
			deleting = false;
			getData();
		}
	};

	const emptyStorage = async (former_photo: string | null) => {
		if (former_photo) {
			try {
				const { error } = await supabase.storage
					.from('avatars')
					.remove([`${user.id}/${former_photo}`]);

				if (error) throw error;
			} catch (error) {
				if (error instanceof Error) {
					alert(error.message);
				}
			}
		}
	};
</script>

<div id="back-button">
	<a id="return" href="/protected_routes/account/update">
		<button id="button1" class="button buttonPerso3 block primary"> &lt Retour</button>
	</a>
</div>

<div class="myTitle" style="background-color: var(--custom-color3)">
	<div class="myTitle-text">
		<h1 class="header">Changer de photo de profil</h1>
	</div>
</div>
<div class="myBody">
	<div class="myBody-text">
		<div class="row">
			<div class="column">
				{#if url_photo}
					<div class="avatar image fmex-center">
						<img src={url_photo} alt={downloading ? 'Downloading ...' : ''} class="avatar image" />
					</div>
				{/if}
			</div>
			<div class="column">
				<div class="body">
					<label class="button buttonPerso2 block" for="single">
						{uploading ? 'Uploading ...' : 'Nouvelle image'}
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
					<button class="button buttonPerso4 block" on:click={deletePhoto}
						>{deleting ? 'Deleting ...' : 'Supprimer'}</button
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
