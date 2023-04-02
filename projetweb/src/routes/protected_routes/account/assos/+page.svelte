<script lang="ts">
	import { page } from '$app/stores';
	import { supabase } from '$lib/supabaseClient';
	import { onMount } from 'svelte';

	let user = $page.data.session.user;

	let assos: any[] | null = null;

	let loading = false;
	onMount(() => {
		getAssos();
	});

	// GET the user's assos from the database
	const getAssos = async () => {
		try {
			loading = true;

			let { data, error } = await supabase
				.from('members')
				.select('*,association(*)')
				.eq('id_user', user.id);
			console.log(data);

			if (data) {
				assos = data;
			}

			if (error) throw error;
		} catch (error) {
			if (error instanceof Error) {
				alert(error.message);
			}
		} finally {
			loading = false;
		}
	};
</script>

<div id="back-button">
	<a id="return" href="/protected_routes/account/">
		<button id="button1" class="button buttonPerso3 block primary"> &lt Retour</button>
	</a>
</div>

<div class="myTitle" style="background-color: var(--custom-color2-2)">
	<div class="myTitle-text">
		<h1>Mes assos</h1>
	</div>
</div>
<div class="myBody">
	<div class="myBody-text">
		<div class="buttons form-widget">
			<div>
				<a class="buttonLink" href="/protected_routes/account/assos/member">
					<button class="buttonPerso1 button block"> Devenir membre d'une association</button></a
				>
			</div>
			<div>
				<a class="buttonLink" href="/protected_routes/account/assos/create">
					<button class="buttonPerso2 button block">Créer une association</button>
				</a>
			</div>
		</div>
		<hr />
		<div>
			{#if loading}
				<div class="row flex-center flex">
					<h2>Chargement...</h2>
				</div>
			{:else if assos}
				{#each assos as asso}
					<div class="assoHolder">
						<h1>{asso.association.name_association}</h1>
						<p>{asso.association.description}</p>
					</div>
				{/each}
			{:else}
				<div class="row flex-center flex">
					<h2>Aucune asso</h2>
				</div>
			{/if}
		</div>
	</div>
</div>

<style>
	.buttons {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		margin-top: 2rem;
		/* text-align: center;*/
		justify-content: space-around;
		padding: 0 8rem;
		width: 100%;
	}

	.buttonLink {
		text-decoration: none;
		width: 100%;
		margin: 5px;
	}

	hr {
		display: block;
		height: 1px;
		border: 0;
		border-top: 1px solid var(--custom-color4);
		margin: 0;
		padding: 0;
	}

	.assoHolder {
		border-radius: 1rem;
		background-color: var(--custom-color3);
		margin-top: 1rem;
		margin-bottom: 1rem;
		padding: 1rem 2rem;
		padding-top: 0.4rem;
	}

	.assoHolder h1 {
		font-size: 2rem;
		font-weight: 500;
		/* margin-top: 1rem; */
	}

	.assoHolder p {
		font-size: 1rem;
		font-weight: 300;
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
