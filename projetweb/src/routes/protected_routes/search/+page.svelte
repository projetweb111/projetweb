<script lang="ts">
	import { onMount } from 'svelte';
	import { supabase } from '$lib/supabaseClient';
	import { page } from '$app/stores';
	import PostTemplate from '../../timeline/postTemplate.svelte';

	let com = '';
	let loading = false;
	let like = 0;
	let post_id: any = null;

	let posts: any[] | null = null;
	let search_text: string = '';

	// should update when we have auth
	const getPost = async () => {
		try {
			loading = true;

			//const { data, error, status } = await supabase
			//.from('post')
			//.select(`username, com, association, title, content, count_likes, users!inner(*)`)
			let { data, error } = await supabase
				.from('post')
				.select('*,users(first_name)')
				.order('date_publish', { ascending: true });
			//console.log(posts)

			if (data) {
				posts = data;
				//console.table(posts);
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

	// search for post by association
	const searchPostByAsso = async () => {
		try {
			loading = true;

			let { data, error } = await supabase
				.from('post')
				.select('*,users(first_name)')
				.eq('association', search_text)
				.order('date_publish', { ascending: true });
			console.log(posts);

			if (data) {
				posts = data;
				console.table(posts);
			}
		} catch (error) {
			if (error instanceof Error) {
				alert(error.message);
			}
		} finally {
			loading = false;
		}
	};

	const searchPostByTitle = async () => {
		try {
			loading = true;

			let { data, error } = await supabase
				.from('post')
				.select('*,users(first_name)')
				.eq('title', search_text)
				.order('date_publish', { ascending: true });
			console.log(posts);

			if (data) {
				posts = data;
				console.table(posts);
			}
		} catch (error) {
			if (error instanceof Error) {
				alert(error.message);
			}
		} finally {
			loading = false;
		}
	};

	const searchPostByContent = async () => {
		try {
			loading = true;

			let { data, error } = await supabase
				.from('post')
				.select('*,users(first_name)')
				.textSearch('content', search_text)
				.order('date_publish', { ascending: true });
			console.log(posts);

			if (data) {
				posts = data;
				console.table(posts);
			}
		} catch (error) {
			if (error instanceof Error) {
				alert(error.message);
			}
		} finally {
			loading = false;
		}
	};

	const addLikes = async (post_title: string) => {
		try {
			loading = true;

			let { data, error } = await supabase
				.from('post')
				.select('count_likes,id')
				.eq('title', post_title)
				.single();
			let Data = data;

			if (Data) {
				let Liked = await isLiked(post_title, Data.id);
				console.log(Liked);
				if (Liked == false) {
					post_id = Data.id;

					let likes = Data.count_likes;
					likes = likes + 1;
					let { data } = await supabase
						.from('post')
						.update({ count_likes: likes })
						.eq('title', post_title);
					like += 1;
					let { data: liked } = await supabase
						.from('like_post')
						.upsert([{ id_post: Data.id, id_user: $page.data.session.user.id }]);
					console.log(liked);
				}
			}

			if (error) throw error;
		} catch (error) {
			if (error instanceof Error) {
				alert(error.message);
			}
		} finally {
			loading = false;
			getPost(); // update the page
		}
	};

	const isLiked = async (post_title: string, post_id: any) => {
		// true if the user has already liked the post
		let { data: liked } = await supabase
			.from('like_post')
			.select('*')
			.eq('id_post', post_id)
			.eq('id_user', $page.data.session.user.id)
			.single();
		//console.table(liked)
		if (liked != null) {
			return true;
		} else {
			return false;
		}
	};

	onMount(() => {
		searchPostByAsso();
	});
</script>

<div id="back-button">
	<a id="return" href="/">
		<button id="button1" class="button buttonPerso3 block primary"> &lt Retour</button>
	</a>
</div>

<div class="myTitle" style="background-color: var(--custom-color3)">
	<div class="myTitle-text">
		<h1 class="header">Recherche</h1>
	</div>
</div>
<div class="myBody">
	<div class="myBody-text">
		<div>
			<div id="all-asso">
				<a href="/association">
					<button>Voir toutes les associations</button>
				</a>
			</div>
			<hr />
			<div>
				<p>
					Rechercher par
					<select>
						<option value="association" on:click={searchPostByAsso}>association</option>
						<option value="title" on:click={searchPostByTitle}>titre</option>
						<option value="content" on:click={searchPostByContent}>contenu</option>
					</select>
				</p>
				<p>
					<input class="inputField" type="com" placeholder="Recherche" bind:value={search_text} />
				</p>
				<button class="button block" on:click={getPost}>Voir les posts</button>
			</div>
			<div>
				{#if posts}
					{#each posts as post}
						<PostTemplate
							PostTitle={post.title}
							PostAssociation={post.association}
							PostAuthor={post.users.first_name}
							PostContent={post.content}
						>
							<button class="buttonLike" id={post.title} on:click={() => addLikes(post.title)}
								>{post.count_likes}
								{#if true}
									<!-- //ajouter une fonction qui vérifie si l'utilisateur a déjà liké le post -->
									<span id="heart">♥</span>
								{:else}
									<span id="heart">♡</span>
								{/if}
							</button>
						</PostTemplate>
					{/each}
				{:else}
					<p id="no-post">loading...</p>
				{/if}
			</div>
		</div>
	</div>
</div>

<style>
	select {
		background-color: var(--custom-panel-color);
	}

	#all-asso {
		display: flex;
		justify-content: center;
	}

	hr {
		display: block;
		height: 1px;
		border: 0;
		border-top: 1px solid var(--custom-color1);
		margin: 3em 0;
		padding: 0;
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

	#no-post {
		text-align: center;
	}

	#heart {
		text-decoration: bold;
		font-size: 1rem;
	}

	.buttonLike {
		font-size: 0.8em;
	}
</style>
