<script lang="ts">
	import { page } from '$app/stores'
    import { supabase } from '$lib/supabaseClient'
    import { onMount } from 'svelte'

    let user = $page.data.session.user;

	let posts : any[] | null = null;

	let loading = false;
    onMount(() => {
      getPosts();
    })


    // GET the user's posts from the database
    const getPosts = async () => {
      try {
        loading = true

        let { data, error } = await supabase
        .from('post')
        .select('*')
        .eq('id_author', user.id)
        console.log(data);

        if (data) {
            posts = data
        }

        if (error) throw error
      } 
      catch (error) {
        if (error instanceof Error) {
          alert(error.message)
        }
      } 
      finally {
        loading = false
      }
    };
</script>


<form class="row flex-center flex">
    <h1>Mes posts</h1>
</form>
    
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