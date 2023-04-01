<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { supabase } from '$lib/supabaseClient';
	import { onMount } from 'svelte';

	let user = $page.data.session.user;

	let first_name: string | null = null;
	let last_name: string | null = null;
	let pseudo: string | null = null;
	let email: string | null = null;
	let status: string | null = null;
	let promo: string | null = null;
	let photo: string | null = null;
	let url_photo: string | null = null;

	let new_first_name: string | null = null;
	let new_last_name: string | null = null;
	let new_pseudo: string | null = null;
	let new_promo: string | null = null;

	let loading = false;
	let downloading = false;
	async function handleSubmit() {
		try {
			loading = true;
			let { error } = await supabase
				.from('users')
				.update({
					first_name: new_first_name ? new_first_name : first_name,
					last_name: new_last_name ? new_last_name : last_name,
					pseudo: new_pseudo ? new_pseudo : pseudo,
					promo: new_promo ? new_promo : promo
				})
				.eq('id', user.id);

			if (error) throw error;

			loading = false;
			goto('/protected_routes/account');
		} catch (error) {
			if (error instanceof Error) {
				alert(error.message);
			}
		} finally {
			loading = false;
		}
	}

	onMount(() => {
		getData();
	});

	// GET the user's data from the database
	const getData = async () => {
		try {
			loading = true;

			let { data, error } = await supabase
				.from('users')
				.select('first_name, last_name, pseudo, email, status, promo, photo')
				.eq('id', user.id)
				.single();

			if (data) {
				first_name = data.first_name;
				last_name = data.last_name;
				pseudo = data.pseudo;
				email = data.email;
				status = data.status;
				promo = data.promo;
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
</script>

<div id="back-button">
	<a id="return" href="/protected_routes/account/">
		<button id="button1" class="button buttonPerso3 block primary"> &lt Retour</button>
	</a>
</div>

<div class="myTitle" style="background-color: var(--custom-color3)">
	<div class="myTitle-text">
		<h1 class="header">Modifier mes informations</h1>
	</div>
</div>
<div class="myBody">
	<div class="myBody-text">
		<div>
			<div class="row">
				<div class="column">
					<form on:submit|preventDefault={handleSubmit}>
						<div class="form-widget">
							<div>
								<label for="first_name">First name</label>
								<input
									class="inputField"
									type="first_name"
									placeholder={first_name}
									bind:value={new_first_name}
								/>
								<label for="last_name">Last name</label>
								<input
									class="inputField"
									type="last_name"
									placeholder={last_name}
									bind:value={new_last_name}
								/>
								<label for="pseudo">Pseudo</label>
								<input
									class="inputField"
									type="pseudo"
									placeholder={pseudo}
									bind:value={new_pseudo}
								/>
								<label for="promo">Promo</label>
								<input class="inputField" type="promo" placeholder={promo} bind:value={new_promo} />
							</div>
							<div>
								<input
									type="submit"
									class="button buttonPerso1 block primary"
									value={loading ? 'Loading' : 'Enregistrer'}
									disabled={loading}
								/>
							</div>
						</div>
					</form>
				</div>
				<div class="column">
					<a
						href="/protected_routes/account/photo"
						class="avatarPlaceholder"
						style="margin-left: auto;"
					>
						<img src={url_photo} alt={url_photo ? 'Avatar' : 'Pas de photo'} class="avatar image" />
					</a>
				</div>
			</div>
		</div>
		<div>
			<form class="row flex-center flex" on:submit|preventDefault={handleSubmit}>
				<div class="row">
					<div class="column">
						<div>
							<label for="email">Email</label>
							<p>{email}</p>
						</div>
						<a class="button buttonPerso2 block link1" href="/protected_routes/account/auth"
							>Changer les informations de connexion</a
						>
					</div>
					<div class="column">
						<div>
							<label for="status">Statut</label>
							<p>{status}</p>
						</div>
						<a class="button buttonPerso3 block link1" href="/protected_routes/account/status"
							>Demander un nouveau rôle</a
						>
					</div>
				</div>
			</form>
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

	.link1 {
		text-decoration: none;
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
