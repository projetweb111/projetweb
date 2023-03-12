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
    let search_text: string  = ''

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

// search for post by association
const searchPostByAsso = async () => {
  try {
    loading = true
    const { user } = session

    let { data, error } = await supabase
    .from('post')
    .select()
    .eq('association', search_text)
    .order('date_publish', { ascending: true})
    console.log(posts)

    if (data) {
      
      posts=data
      console.table(posts);}
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message)
      }
    } finally {
      loading = false
    }
  }

  const searchPostByTitle = async () => {
  try {
    loading = true
    const { user } = session

    let { data, error } = await supabase
    .from('post')
    .select()
    .eq('title', search_text)
    .order('date_publish', { ascending: true})
    console.log(posts)

    if (data) {
      
      posts=data
      console.table(posts);}
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message)
      }
    } finally {
      loading = false
    }
  }

  const searchPostByContent = async () => {
  try {
    loading = true
    const { user } = session

    let { data, error } = await supabase
    .from('post')
    .select()
    .textSearch('content', search_text)
    .order('date_publish', { ascending: true})
    console.log(posts)

    if (data) {
      
      posts=data
      console.table(posts);}
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message)
      }
    } finally {
      loading = false
    }
  }


onMount(() => {
  searchPostByAsso()
})


</script>

<div>
    <a href="/association">
        <button>show all the associations</button>
    </a>   
</div>
<div>
    <p>
    <input class="inputField" type="com" placeholder="search posts by association" bind:value="{search_text}" />
    </p>
    <button class="button block" on:click="{getPost}" >print all posts</button>
    <p>By 
      <select>
        <option value="association" on:click={searchPostByAsso}>association</option>
        <option value="title" on:click={searchPostByTitle}>title</option>
        <option value="content" on:click={searchPostByContent}>content</option>
      </select>

    </p>
    
  </div>
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

<style>
  select {
   background-color: black;
  }
</style>