<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { supabase } from '$lib/supabaseClient';
	import { onMount } from 'svelte';

	let loading = false;
	onMount(() => {
		getAssos();
		console.log(myAssociations);
	});

	let myTitle: string | null = null;
	let myMessage: string | null = null;
	let myAssociation: string | null = null;
	let myAssociations: any[] = [];
	let user = $page.data.session.user;

	const addMessage = async () => {
		try {
			loading = true;
			// console.log(myAssociation.association.name_association);
			const { data, error } = await supabase.from('post').insert({
				association: myAssociation?.association.name_association,
				title: myTitle,
				content: myMessage,
				id_author: user.id
			});

			if (error) throw error;
		} catch (error) {
			if (error instanceof Error) {
				console.log(error.message);
			}
		} finally {
			loading = false;
			goto('/');
		}
	};

	const getAssos = async () => {
		try {
			loading = true;
			let { data, error } = await supabase
				.from('members')
				.select('*,association(*)')
				.eq('id_user', user.id);

			if (data) {
				myAssociations = data;
				console.log(myAssociations);
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

<div class="myTitle" style="background-color: var(--custom-color1-2)">
	<div class="myTitle-text">
		<h1>Publier</h1>
	</div>
</div>
<div class="myBody">
	<div class="myBody-text">
		<form id="formPublish" on:submit|preventDefault={addMessage}>
			<input bind:value={myTitle} type="text" placeholder="Titre" />

			<input bind:value={myMessage} type="text" aria-label="Post a message" placeholder="Message" />

			<select id="scrolldown" bind:value={myAssociation}>
				{#each myAssociations as asso}
					<option value={asso}>{asso.association.name_association}</option>
				{/each}
			</select>
			<input
				id="buttonPublish"
				type="submit"
				class="buttonPerso3 button block"
				value={loading ? 'Loading' : 'Publier'}
				disabled={loading}
			/>
		</form>
	</div>
</div>

<style>
	#formPublish {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	#buttonPublish {
		margin-top: 2rem;
	}

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
</style>
