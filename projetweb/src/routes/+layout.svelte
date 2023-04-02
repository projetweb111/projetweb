<script lang="ts">
	import { supabase } from '$lib/supabaseClient';
	import { invalidateAll } from '$app/navigation';
	import { onMount } from 'svelte';
	import './styles.css';
	import { page } from '$app/stores';
	import SignOut from './signOut/signOut.svelte';
	import MyAccount from './MyAccountPage.svelte';

	onMount(() => {
		const {
			data: { subscription }
		} = supabase.auth.onAuthStateChange(() => {
			invalidateAll();
		});

		return () => {
			subscription.unsubscribe();
		};
	});

	// For the dropdown menu of account
	let showDropdown: boolean = false;

	// Close the dropdown menu if the user clicks outside of it
	import { clickOutside } from './clickOutside.js';

	function handleClickOutside(event: any) {
		showDropdown = false;
	}
</script>

<nav>
	<a href="/" class="h0">Mines Com</a>

	{#if !$page.data.session}
		<div class="notSignedIn">
			<button><a href="/signIn">Se connecter</a></button>
			<button><a href="/signUp">Créer un compte</a></button>
		</div>
	{:else}
		<div class="dropdown" use:clickOutside on:click_outside={handleClickOutside}>
			<!-- // message d'erreur, mais ça marche ¯\_ツ_/¯ -->
			<button
				on:click={() => {
					showDropdown = !showDropdown;
				}}
				class="dropbtn">Mon compte</button
			>

			{#if showDropdown}
				<div class="dropdown-content">
					<span
						on:click={() => {
							showDropdown = !showDropdown;
						}}
						on:keypress><MyAccount /></span
					>
					<SignOut />
				</div>
			{/if}
		</div>
	{/if}

	<!-- <a href="/">🏠 Home</a>
	{#if !$page.data.session}
		<a href="/signIn">Log in</a>
		<a href="/signUp">Sign up</a>
	{:else}
		<a href="/protected_routes/actualite">Actualités</a>
		<a href="/protected_routes/search"> Search </a>
		<a href="/protected_routes/account">My account</a>
		<SignOut />
	{/if} -->
</nav>

<body>
	<slot />
</body>

<!--  in style
/* Links inside the dropdown */
.dropdown-content a {
  color: black;
  display: flex;
  flex-direction: row;
  justify-content: center;
  font-size: 1.5em;
  /* padding: 0.5em; */
  text-align: center;
  /* display: block; */
}

/* Change color of dropdown links on hover */
.dropdown-link:hover {
  background-color: #ddd;
}
.dropdown-link {
  color: white;
  margin: 1em;
  padding: 1em;
  min-height: 3em;
} -->
<style>
	.notSignedIn {
		display: flex;
		align-items: right;
	}
	.notSignedIn button {
		margin-left: 0.5rem;
		margin-right: 0.5rem;
	}

	.notSignedIn a {
		margin-left: 0.5rem;
		margin-right: 0.5rem;
		font-size: 1rem;
		border-color: #131200;
		border-radius: 0.5rem;
		border-width: 5rem;
	}

	.h0 {
		font-size: 2.5rem;
		font-family: Outfit, sans-serif;
	}
	nav {
		padding-left: 10rem;
		padding-right: 10rem;
		position: sticky;
		top: 0;
		display: flex;
		justify-content: space-between;
		align-items: center;
		background-color: #885053;
		height: 4rem;
		z-index: 100;
	}
	a {
		background: none;
		line-height: 1;
		margin: 0.5em;
		margin-left: 1rem;
		margin-right: 1rem;
		padding: 0.5rem 0.2rem;
	}
	nav a {
		color: #ffffff;
		text-decoration: none;
		font-size: 1.5rem;
		/* padding: 0.5rem; */
	}

	nav a:hover {
		color: #131200;
	}

	a {
		position: relative;
		text-decoration: none;
	}

	a::before {
		content: '';
		position: absolute;
		width: 100%;
		height: 4px;
		border-radius: 4px;
		background-color: #131200;
		bottom: 0;
		left: 0;
		transform-origin: right;
		transform: scaleX(0);
		transition: transform 0.3s ease-in-out;
	}

	a:hover::before {
		transform-origin: left;
		transform: scaleX(1);
	}
	/* 



*/
	/* Dropdown Button */
	.dropbtn {
		background-color: var(--custom-color2);
		color: white;
		padding: 16px;
		font-size: 16px;
		border: none;
		cursor: pointer;
	}

	/* Dropdown button on hover & focus */
	.dropbtn:hover,
	.dropbtn:focus {
		background-color: var(--custom-color2-2);
	}

	/* The container <div> - needed to position the dropdown content */
	.dropdown {
		position: relative;
		display: inline-block;
	}

	/* Dropdown Content (Hidden by Default) */
	.dropdown-content {
		border-radius: 0.5rem;

		right: 0;
		position: absolute;
		background-color: var(--custom-color2);
		padding: 0.5rem;
		min-width: 160px;
		/* box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2); */
		z-index: 20;

		display: flex;
		flex-direction: column;
		justify-content: center;
		font-size: 1.5em;
		/* padding: 0.5em; */
		text-align: center;
		/* display: block; */
	}

	body {
		margin: 0;
		height: 100%;
		overflow: hidden;
	}
</style>
