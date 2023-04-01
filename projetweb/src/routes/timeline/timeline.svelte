<script lang="ts">
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

				if (!liked) {
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
			return true;
		} else {
			return false;
		}
	};

	// Display the posts
</script>

<div>Hello</div>

<div>
	{#if posts}
		{#each posts as post}
			<div class="post">
				<!--
          <img
              src={post.avatarUrl}
              alt={post.avatarUrl ? 'Avatar' : 'No image'}
              
          />
      en attente d'ajouter url pour photo de profil dans tableau users
      -->

				<h3>Title: {post.title}</h3>
				<p>Association: {post.association}</p>
				<p>Author:{post.users.first_name}</p>
			</div>

			<details>
				<summary>Read more</summary>
				<p>{post.content}</p>
			</details>

			<div>
				<button id={post.title} on:click={() => addLikes(post.title)}>♡</button>
				{post.count_likes}
			</div>
		{/each}
	{:else}
		<p>{loading ? 'loading...' : 'Pas de posts'}</p>
	{/if}
</div>
