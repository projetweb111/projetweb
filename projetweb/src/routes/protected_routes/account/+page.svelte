<script lang="ts">
	import { page } from '$app/stores'
  import { supabase } from '$lib/supabaseClient'
  import { onMount } from 'svelte'
	//import Avatar from './Avatar.svelte';

  let user = $page.data.session.user;

	let first_name: string | null = null;
	let last_name: string | null = null;
	let pseudo: string | null = null;
	let email: string | null = null;
	let status: string | null = null;
	let promo: string | null = null;
  let photo: string | null = null;

  let url_photo: string | null = null;

	let loading = false;
  let downloading = false;
    onMount(() => {
      getData();
    })


    // GET the user's data from the database
    const getData = async () => {
      try {
        loading = true

        let { data, error } = await supabase
        .from('users')
        .select('first_name, last_name, pseudo, email, status, promo, photo')
        .eq('id', user.id)
        .single()

        if (data) {
          first_name = data.first_name
          last_name = data.last_name
          pseudo = data.pseudo
          email = data.email
          status = data.status
          promo = data.promo
          photo = data.photo
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
        dowloadPhoto();
      }
    };

	// Download the user's photo from the database
	const dowloadPhoto = async () => {
      if (photo) {
        try {
          downloading = true
          const { data, error } = await supabase
          .storage
          .from('avatars')
          .download(`${user.id}/${photo}`)

          if (data) {
              url_photo = URL.createObjectURL(data);
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
	};
</script>


<form class="row flex-center flex">
    <h1>My account</h1>
    <a  href="/protected_routes/account/photo"  class="avatarPlaceholder" style="margin-left: auto;">
      <img src={url_photo} alt={url_photo ? 'Avatar' : 'Pas de photo'} class="avatar image"/>
    </a>
</form>

{#if first_name}

<form class="row flex-left flex">
    <p><strong>My name : </strong>{first_name} {last_name}</p>
</form>
<form class="row flex-left flex">
    <p><strong>My pseudo : </strong>{pseudo}</p>
</form>
<form class="row flex-left flex">
    <p><strong>My email : </strong>{email}</p>
</form>
<form class="row flex-left flex">
    <p><strong>Promo : </strong>{promo}</p>
</form>
<form class="row flex-left flex">
    <p><strong>Status : </strong>{status}</p>
</form>

<form class="row flex-right flex">
    <a class="button block primary" href="/protected_routes/account/update">Edit my account</a>
</form>

{:else}
<p>Loading ...</p>
{/if}


<div class="row flex-center flex footer">
<form class="row flex">
    <a class="button block" href="/protected_routes/account/posts">Mes posts</a>
</form>
<form class="row flex">
    <a class="button block" href="/protected_routes/account/assos">Mes assos</a>
</form>
</div>