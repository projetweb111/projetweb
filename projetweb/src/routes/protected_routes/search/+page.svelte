<script lang="ts">
    import { onMount } from 'svelte'
    import { supabase } from '$lib/supabaseClient'
    import { page } from '$app/stores'

    
    
    let com = '';
    let loading = false 
    let like=0
    let post_id: any = null

    let posts: any[] | null =null
    let search_text: string  = ''

    // should update when we have auth
    const getPost= async () => {
    try {
      loading = true
     
  
      //const { data, error, status } = await supabase
        //.from('post')
        //.select(`username, com, association, title, content, count_likes, users!inner(*)`)
    let { data, error } = await supabase
    .from('post')
    .select('*,users(first_name)')
    .order('date_publish', { ascending: true})
    //console.log(posts)
  
      if (data) {
        
        posts=data
        //console.table(posts);
  
  
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
   

    let { data, error } = await supabase
    .from('post')
    .select("*,users(first_name)")
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
   
    let { data, error } = await supabase
    .from('post')
    .select("*,users(first_name)")
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
    
    let { data, error } = await supabase
    .from('post')
    .select("*,users(first_name)")
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

  const addLikes=async (post_title:string) => {
  try {
      loading = true
     

    let { data, error } = await supabase
    .from('post')
    .select('count_likes,id')
    .eq('title', post_title)
    .single()
    let Data=data
    
    
      if (Data) {        
        let Liked=await isLiked(post_title,Data.id)
        console.log(Liked)
        if(Liked==false)
        {
        post_id=Data.id
        
        let likes=Data.count_likes
        likes=likes+1
        let {data} = await supabase.from('post').update({count_likes:likes}).eq('title', post_title)
        like+=1        
        let {data:liked}= await supabase.from('like_post').upsert([{id_post:Data.id,id_user:$page.data.session.user.id}])
        console.log(liked)
      }

      }
     
  
      if (error) throw error
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message)
      }
    } finally {
      
      loading = false
        getPost()  // update the page
    }
  
}

const isLiked = async(post_title:string,post_id:any)=>{
  // true if the user has already liked the post
  let {data:liked}= await supabase.from('like_post').select('*').eq('id_post', post_id).eq('id_user', $page.data.session.user.id).single()
  //console.table(liked)
  if(liked!=null){
    return true
  }
  else{
    return false
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
    <button class="button block" on:click="{getPost}" >show all posts</button>
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
      
      <h2>Title: {post.title}</h2>
      <p>Association: {post.association}</p>
      <p>Author:{post.users.first_name}</p>
    </div>
    
    <details>
      <summary>Read more</summary>
      <p>{post.content}</p>
    </details>

    <div>
      <button id={post.title} on:click={() => addLikes(post.title) }>♡</button>
      {post.count_likes}
    </div>
  {/each}
{:else}
  <p>loading...</p>
{/if}

<style>
  select {
   background-color: black;
  }
</style>