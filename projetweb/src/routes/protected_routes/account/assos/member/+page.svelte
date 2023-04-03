<script lang="ts">
	import { disableScrollHandling, goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { supabase } from '$lib/supabaseClient';
	import { onMount } from 'svelte';

	let user = $page.data.session.user;

	let list_asso: any[] = [];
	let selected_asso: string | null = null;

	let loading = false;

	onMount(async () => {
		await getAsso();
	});

	// Get all associations
	const getAsso = async () => {
		try {
			loading = true;
			const { data, error } = await supabase.from('association').select('id,name_association');

			if (error) throw error;

			if (data.length > 0) {
				list_asso = data;
				console.log(list_asso);
			}
		} catch (error) {
			if (error instanceof Error) {
				alert(error.message);
			}
		} finally {
			loading = false;
		}
	};

	const handleSubmit = async () => {
		console.log('handleSubmit');
		if (selected_asso) {
			try {
				loading = true;
				const { data, error } = await supabase
					.from('members')
					.insert({ id_user: user.id, id_asso: selected_asso });

				if (error) throw error;

				if (data) {
					alert('Vous êtes maintenant membre de cette association');
				}
				loading = false;
				goto('/protected_routes/account/assos');
			} catch (error) {
				if (error instanceof Error) {
					alert(error.message);
				}
			}
		} else {
			alert('Veuillez choisir une association');
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
		<h1>Devenir membre d'une association</h1>
	</div>
</div>
<div class="myBody">
	<div class="myBody-text">
		<p>
			Choisis ton asso :
			<select id="scrolldown" bind:value={selected_asso}>
				{#each list_asso as asso}
					<option
						value={asso.id}
						on:change={() => console.log(selected_asso, asso.name_association)}
					>
						{asso.name_association}
					</option>
				{/each}
			</select>
		</p>
		<form id="formPublish" on:submit|preventDefault={handleSubmit}>
			<div>
				<input
					type="submit"
					class="button block buttonPerso1"
					value={loading ? 'Loading' : 'Devenir membre'}
					disabled={loading}
				/>
			</div>
			<div>
				<a class="buttonLink" href="/protected_routes/account/assos/create">
					<button class="buttonPerso2 button block">Créer une association</button>
				</a>
			</div>
		</form>
	</div>
</div>

<style>
	#scrolldown {
		width: 60%;
		height: 1.5rem;
		border: 1px solid var(--custom-color3);
		border-radius: 5px;
		background-color: var(--custom-color3);
		color: var(--custom-color1-1);
		font-size: 1rem;
		padding: 0 10px;
		margin-top: 1rem;
	}
	#formPublish {
		display: flex;
		flex-direction: column;
		align-items: center;
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

	.buttonLink {
		text-decoration: none;
	}
</style>
