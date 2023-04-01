<script lang="ts">
	import './../../styles.css';
	import { page } from '$app/stores';
	import { supabase } from '$lib/supabaseClient';
	import { onMount } from 'svelte';
	//import Avatar from './Avatar.svelte';

	let user = $page.data.session.user;

	let first_name: string | null = null;
	let last_name: string | null = null;
	let pseudo: string | null = null;
	let email: string | null = null;
	let status: string | null = null;
	let promo: string | null = null;
	let photo: string | null = null;

	let url_photo: string | null = null;

	let loading = false;
	let downloading = false;
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

<div class="myTitle">
	<div class="myTitle-text">
		<h1>Mon compte</h1>
	</div>
</div>
<div class="myBody">
	<div class="myBody-text">
		{#if first_name}
			<div class="row">
				<div class="column">
					<form class="row flex-left flex">
						<div class="attributes" id="elem1">
							<span class="attribute-name">Nom : </span>
							<span>{first_name} {last_name}</span>
						</div>
					</form>
					<form class="row flex-left flex">
						<div class="attributes" id="elem2">
							<span class="attribute-name">Pseudo : </span>
							<span>{pseudo}</span>
						</div>
					</form>
					<form class="row flex-left flex">
						<div class="attributes" id="elem3">
							<span class="attribute-name">Email :</span>
							<span>{email}</span>
						</div>
					</form>
					<form class="row flex-left flex">
						<div class="attributes" id="elem4">
							<span class="attribute-name">Promo : </span>
							<span>{promo}</span>
						</div>
					</form>
					<form class="row flex-left flex">
						<div class="attributes" id="elem5">
							<span class="attribute-name">Statut : </span>
							<span>{status}</span>
						</div>
					</form>
				</div>
				<div class="column">
					<a
						href="/protected_routes/account/photo"
						class="avatarPlaceholder"
						style="margin-left: auto;"
					>
						<img
							src={url_photo}
							alt={url_photo
								? 'Avatar'
								: `${loading ? 'Loading ...' : `${downloading ? 'Loading ...' : 'Pas de photo'}`}`}
							class="avatar image"
						/>
					</a>
				</div>
			</div>
			<form class="row flex-right flex">
				<a class="button block primary buttonInfos" href="/protected_routes/account/update"
					>Modifier mes informations</a
				>
			</form>
		{:else}
			<p>Chargement...</p>
		{/if}
	</div>
</div>

<div id="right-panel">
	<div class="col-6 flex">
		<a class="button-link" href="/protected_routes/account/posts">
			<button id="button1" class="panel-button buttonPerso3">Mes posts</button></a
		>
	</div>
	<div class="col-6 flex">
		<a class="button-link" href="/protected_routes/account/assos">
			<button id="button2" class="panel-button buttonPerso2">Mes assos</button></a
		>
	</div>
</div>

<style>
	.buttonInfos {
		text-decoration: none;
		font-size: 1rem;
		color: var(--custom-color3);
	}

	.buttonInfos:hover {
		background-color: var(--custom-color3);
		color: var(--custom-color-brand);
	}

	.row {
		display: flex;
		margin-bottom: 1.2rem;
	}

	.column {
		flex: 50%;
	}

	.attributes {
		margin: 0.2rem;
	}

	.attribute-name {
		font-size: 1.3rem;
		font-weight: bold;
		color: var(--custom-color1);
		font-family: Outfit, Helvetica Neue, sans-serif;
	}

	.myBody {
		height: 50%;
	}

	/* for return button */
	#right-panel {
		z-index: 5;
		position: absolute;
		right: 10%;
		top: 30%;
		margin: 1rem;
		width: fit-content;
		display: flex;
		flex-direction: column;
		/* justify-content: flex-end; */
	}

	.button-link {
		text-decoration: none;
	}

	.panel-button {
		font-size: 1.2rem;
		min-width: 9em;
		display: flex;
		align-items: center;
		justify-content: center;
		border: 1px solid var(--custom-color1);
		background-color: var(--custom-color1);
		text-transform: none !important;
		transition: all 0.2s ease;
		margin: 0.5rem;
		align-self: flex-end;
	}

	.panel-button:hover {
		font-size: 1.3rem;
		background-color: #2a2a2a;
		border: 1px solid var(--custom-color1);
	}
</style>
