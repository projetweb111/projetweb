<script lang="ts">
	import { page } from '$app/stores';
	import { supabase } from '$lib/supabaseClient';
	import { onMount } from 'svelte';

	let user = $page.data.session.user;

	let posts: any[] | null = null;

	let loading = false;
	onMount(() => {
		getPosts();
	});

	// GET the user's posts from the database
	const getPosts = async () => {
		try {
			loading = true;

			let { data, error } = await supabase.from('post').select('*').eq('id_author', user.id);
			console.log(data);

			if (data) {
				posts = data;
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

<div class="myTitle" style="background-color: var(--custom-color5-2)">
	<div class="myTitle-text">
		<h1>Mes posts</h1>
	</div>
</div>
<div class="myBody">
	<div class="myBody-text">
		<div>
			{#if loading}
				<div class="row flex-center flex">
					<h2>Chargement...</h2>
				</div>
			{:else if posts}
				{#each posts as post}
					<div>
						<h1>{post.title}</h1>
						<h2>{post.association}</h2>
						<details>
							<summary>Content</summary>
							<p>{post.content}</p>
						</details>
					</div>
				{/each}
			{:else}
				<div class="row flex-center flex">
					<h2>Aucun post</h2>
				</div>
			{/if}
		</div>
	</div>
</div>

<style>
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
