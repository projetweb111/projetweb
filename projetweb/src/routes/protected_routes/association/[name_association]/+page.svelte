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
    let members: any[] | null =null
    
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
        getMembers();
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
          }

          if (error) throw error
        } 
        catch (error) {
          if (error instanceof Error) {
            alert(error.message)
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

  const getMembers = async () => {
    try {
      loading = true
      let { data, error } = await supabase
      .from('members')
      .select('*,users(first_name,last_name))')
      .eq('id_asso', id_association)
      if (data) {
        members=data
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
  }
    </script>

<div id="back-button">
	<a id="return" href="/protected_routes/association/">
		<button id="button1" class="button buttonPerso3 block primary"> &lt Retour</button>
	</a>
</div>

<div class="myTitle" style="background-color: var(--custom-color2-2)">
	<div class="myTitle-text">
		<h1>{data.association.name_association}</h1>
	</div>
  <a  href="/protected_routes/association/{dataPage.association.name_association}/logo"  class="avatarPlaceholder" style="margin-left: auto;">
    <img src={url_logo} alt={url_logo ? 'Avatar' : 'Pas de logo'} class="avatar image"/>
  </a>
</div>

<div class="myBody">
	<div class="myBody-text">

      <div class="assoHolder">
        <h1>Members</h1>
      {#if members}
      {#each members as member}
        <div class="post">
          <hp>{member.users.first_name} {member.users.last_name}</hp>
        </div>
      {/each}
      {:else}
        <p>loading...</p>
      {/if}
      </div>

      <div class="assoHolder">
        <h1>Description</h1>
        {#if data.association.description}
          <p>{data.association.description}</p>
        {/if}
      </div>

      <div class="assoHolder">
        <h1>Actualités</h1>
        
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

      </div>

  </div>
  </div>

  <style>  
    .assoHolder {
      border-radius: 1rem;
      background-color: var(--custom-color3);
      margin-top: 1rem;
      margin-bottom: 1rem;
      padding: 1rem 2rem;
      padding-top: 0.4rem;
    }
  
    .assoHolder h1 {
      font-size: 2rem;
      font-weight: 500;
      /* margin-top: 1rem; */
    }
  
    .assoHolder p {
      font-size: 1rem;
      font-weight: 300;
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
  </style>  