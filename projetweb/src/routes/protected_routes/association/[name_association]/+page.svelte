<script lang="ts">
    import { supabase } from '$lib/supabaseClient'
	import { onMount } from 'svelte';
    export let data

    export let dataPage=data
    export const name_association = {name:dataPage.association.name_association}
    let id_association = dataPage.association.id
    let downloading = false;
    let loading = false
    let posts: any[] | null =null
    let logo: string | null = null;
    let url_logo: string | null = null;
    let association=data.association
    
    // GET the association's logo from the database
    // GET the association's logo from the database
	const getData = async () => {
      try {
        loading = true

        let { data, error } = await supabase
        .from('association')
        .select('name_association, photo_url')
        .eq('id', association.id)
        .single()
        

        if (data) {
            logo = data.photo_url
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
        dowloadLogo();
        getPost();
      }
    };


    const dowloadLogo = async () => {
      if (logo) {
        try {
          downloading = true
          const { data, error } = await supabase
          .storage
          .from('logos')
          .download(`${association.id}/${logo}`)
          
          if (data) {
              url_logo = URL.createObjectURL(data);
              console.log(url_logo)
          }

          if (error) throw error
        } 
        catch (error) {
          if (error instanceof Error) {
            alert(error.message)
            console.log(url_logo)
          }
        } 
        finally {
          downloading = false;
        }
      }
    }
   
    const getPost= async () => {
    try {
      loading = true

      let { data, error } = await supabase
      .from('post')
      .select('*,users(first_name)')
      .eq('association', dataPage.association.name_association)
      .order('date_publish', { ascending: true})
    
      if (data) {
        posts=data
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

  onMount(() => {
    getData();
  })
    </script>

<form class="row flex-left flex">
    <h1><strong>{data.association.name_association}</strong></h1>
    <a  href="/protected_routes/association/{dataPage.association.name_association}/logo"  class="avatarPlaceholder" style="margin-left: auto;">
        <img src={url_logo} alt={url_logo ? 'Avatar' : 'Pas de logo'} class="avatar image"/>
    </a>
</form>
<form class="row flex-left flex">
    <h1>Description</h1>
</form>

<form class="row flex-left flex">
    <h1>{data.association.description}</h1>
</form>

<form class="row flex-left flex">
    <h1>Actualités</h1>
</form>
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
    {/each}
  {:else}
    <p>loading...</p>
  {/if}