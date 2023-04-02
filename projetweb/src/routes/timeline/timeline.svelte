<script lang="ts">
	import PostTemplate from './postTemplate.svelte';
	let loading = false;

	import { onMount } from 'svelte';
	import { supabase } from '$lib/supabaseClient';
	import { page } from '$app/stores';

	let posts: any[] | null = null;

	onMount(() => {
		getPost();
	});

	// GET the posts from the database
	const getPost = async () => {
		try {
			loading = true;

			const { data, error } = await supabase
				.from('post')
				.select(`*, users(first_name), like_post(count)`)
				.order('date_publish', { ascending: false });

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

	// Add a like to the post or dislike it if the user has already liked it
	const addLikes = async (post_title: string) => {
		try {
			loading = true;

			const { data, error } = await supabase
				.from('post')
				.select('count_likes,id')
				.eq('title', post_title)
				.single();

			let post_to_like = data?.id;
			let likes_of_post_to_like = data?.count_likes;

			if (data) {
				let liked = await isLiked(post_to_like);

				if (liked === 0) {
					try {
						const { error } = await supabase
							.from('like_post')
							.upsert([{ id_post: post_to_like, id_user: $page.data.session.user.id }]);

						if (error) throw error;

						try {
							const { error } = await supabase
								.from('post')
								.update({ count_likes: likes_of_post_to_like + 1 })
								.eq('id', post_to_like);

							if (error) throw error;
						} catch (error) {
							if (error instanceof Error) {
								alert(error.message);
							}
						}
					} catch (error) {
						if (error instanceof Error) {
							alert(error.message);
						}
					}
				} else {
					try {
						const { error } = await supabase
							.from('like_post')
							.delete()
							.eq('id_post', post_to_like)
							.eq('id_user', $page.data.session.user.id);

						if (error) throw error;

						try {
							const { error } = await supabase
								.from('post')
								.update({ count_likes: likes_of_post_to_like - 1 })
								.eq('id', post_to_like);

							if (error) throw error;
						} catch (error) {
							if (error instanceof Error) {
								alert(error.message);
							}
						}
					} catch (error) {
						if (error instanceof Error) {
							alert(error.message);
						}
					}
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

	// Check if the user has already liked the post
	const isLiked = async (post_id: any) => {
		let { data: liked } = await supabase
			.from('like_post')
			.select()
			.eq('id_post', post_id)
			.eq('id_user', $page.data.session.user.id);

		if (liked && liked.length > 0) {
			return 1;
		} else {
			return 0;
		}
	};
</script>

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
		<h3 id="no-post">
			{loading ? 'loading...' : "Il n'y a malheureusement aucune communication pour le moment"}
		</h3>
	{/if}
</div>

<style>
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
