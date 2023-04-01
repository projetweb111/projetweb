<script lang="ts">
	import Timeline from './timeline/timeline.svelte';
	import { goto, invalidateAll } from '$app/navigation';
	import { page } from '$app/stores';
	import { supabase } from '$lib/supabaseClient';
	import Reset from './Reset.svelte';

	let reset: boolean = false;

	supabase.auth.onAuthStateChange((event, session) => {
		if (event == 'PASSWORD_RECOVERY') {
			console.log('PASSWORD_RECOVERY', session);

			// show screen to update user's password
			reset = true;
		} else {
			reset = false;
		}
	});
</script>

<svelte:head>
	<title>Mines Com - Accueil</title>
</svelte:head>

<body>
	{#if reset}
		<Reset />
	{:else if !$page.data.session}
		<div class="myTitle">
			<div class="myTitle-text">
				<h1>Bienvenue</h1>
			</div>
		</div>
		<div class="myBody">
			<form class="myBody-text">
				<p class="form-widget">
					Veuillez vous connecter pour profitez de toutes les fonctionnalités.
				</p>
			</form>
		</div>
	{:else}
		<div class="myTitle">
			<div class="myTitle-text">
				<h1>Fil des communications</h1>
			</div>
			<div class="myTitle-text recherche">
				<p>Recherche</p>
			</div>
		</div>
		<div class="myBody">
			<form class="myBody-text">
				<Timeline />
			</form>
		</div>
	{/if}
</body>

<style>
	.recherche {
		text-align: right;
	}
</style>
