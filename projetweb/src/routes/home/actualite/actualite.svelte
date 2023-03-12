
<script lang="ts">
  import { onMount } from 'svelte'
  import type { AuthSession } from '@supabase/supabase-js'
  import { supabase } from '$lib/supabaseClient'
   
   
export let session: AuthSession

let com = '';
let loading = false
let association: string | null = null
let title: string | null = null
let content: string | null = null
let count_likes: number | null = null
let posts: any[] | null =null

// should update when we have auth
const getPost= async () => {
    try {
      loading = true
      const { user } = session
  
      //const { data, error, status } = await supabase
        //.from('post')
        //.select(`username, com, association, title, content, count_likes, users!inner(*)`)
    let { data, error } = await supabase
    .from('post')
    .select()
    .order('date_publish', { ascending: true})
    console.log(posts)
  
      if (data) {
        
        posts=data
        console.table(posts);
  
  
      }
  
      if (error) throw error
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message)
      }
    } finally {
      loading = false
    }
  };

//onMount(() => {
  //getPost()
//});



onMount(() => {
  getPost()
})


// code to fold the content of the posts

</script>
<title>Actualité</title>
<h1>Actualité</h1>
<p>Voici les dernières actualités</p>



{#if posts}
  {#each posts as post}
    <div class="post">
      
      <h2>{post.title}</h2>
      <p>{post.association}</p>
    </div>
    
    <details>
      <summary>Read more</summary>
      <p>{post.content}</p>
    </details>

  {/each}
{:else}
  <p>loading...</p>
{/if}
