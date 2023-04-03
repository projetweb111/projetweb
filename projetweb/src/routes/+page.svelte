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
		<div id="headerMain">
			<div class="myTitle-text" id="recherche">
				<a id="return" href="/protected_routes/search/">
					<button id="button1" class="buttonPerso1 block"> Recherche</button>
				</a>
			</div>

			<div class="myTitle">
				<div class="myTitle-text">
					<h1>Fil des communications</h1>
				</div>
			</div>
		</div>
		<div class="myBody">
			<div class="myBody-text">
				<Timeline />
			</div>
		</div>
	{/if}
</body>

<!-- {#if $page.data.session}
	<div id="background">
		<div id="circ1" class="circle" />
		<div id="circ2" class="circle" />
		<div id="circ3" class="circle" />
	</div>
{/if} -->
<style>
	/* .myTitle,
	.myTitle-text,
	.myBody {
		z-index: 3;
	}*/

	#headerMain {
		position: sticky;
		top: 0;
	}

	/*
	#background {
		position: absolute;
		top: 50%;
		left: 25%;
		width: 100%;
		height: 100%;
		background-size: cover;
		background-repeat: repeat-y;
		z-index: 0;
	}

	.circle {
		position: absolute;
		width: 50px;
		height: 50px;
		border-radius: 50%;
	} 

	#circ1 {
		background: var(--custom-color5);
	}

	#circ2 {
		background: var(--custom-color2);
	}

	#circ3 {
		background: var(--custom-color1);
	}
	*/

	/* for return button */
	#recherche {
		z-index: 5;
		position: absolute;
		right: 25%;
		top: 65%;
		margin: 1rem;
		width: fit-content;
	}

	#return {
		text-decoration: none;
	}

	#button1 {
		color: #2a2a2a;
		display: flex;
		align-items: center;
		justify-content: center;
		border: 1px solid var(--custom-color5);
		background-color: var(--custom-color5);
		text-transform: none !important;
		transition: all 0.2s ease;
	}

	#button1:hover {
		color: var(--custom-color);
		background-color: #2a2a2a;
		border: 1px solid var(--custom-color5);
	}
</style>
