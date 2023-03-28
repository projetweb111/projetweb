<script lang="ts">
	import { page } from '$app/stores'
  import { supabase } from '$lib/supabaseClient'
  import { onMount } from 'svelte'

  let user = $page.data.session.user;
  
  let first_name: string | null = null;
  let last_name: string | null = null;
	
  let files: FileList;
  let url_photo: string | null = null;
	let photo: string | null = null;
	let new_photo: string | null = null;

	let loading = false;
  let uploading = false;
  let downloading = false;
  let deleting = false;

	onMount(() => {
	  getData();
	})

	// GET the user's photo from the database
	const getData = async () => {
    console.log("getData");
      try {
        loading = true

        let { data, error } = await supabase
        .from('users')
        .select('first_name, last_name, photo')
        .eq('id', user.id)
        .single()

        if (data) {
            first_name = data.first_name
            last_name = data.last_name
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

    // Upload the user's photo from its file
    const uploadAvatar = async () => {
      console.log("uploadAvatar");
      try {
        uploading = true
        
        const avatarFile = files[0]
        const { data, error } = await supabase
          .storage
          .from('avatars')
          .upload(`${user.id}/avatar_${avatarFile.name}`, avatarFile, {
            cacheControl: '3600',
            upsert: true
          })

        if (data) {
          new_photo = `avatar_${avatarFile.name}`;
        }
        updatePhoto();

        if (error) throw error
      } 
      catch (error) {
        if (error instanceof Error) {
          alert(error.message)
        }
      } 
      finally {
        uploading = false
      }
    }

    // Update the user's photo in the database
    const updatePhoto = async () => {
      console.log("updatePhoto");
      try {
        uploading = true
        let { error } = await supabase
        .from('users')
        .update({ photo: new_photo? new_photo : photo })
        .eq('id', user.id)

        if (error) throw error
      } 
      catch (error) {
        if (error instanceof Error) {
          alert(error.message);
        }
      } 
      finally {
        uploading = false
        getData();
      }
    }

    // Download the user's photo from the database
    const dowloadPhoto = async () => {
      console.log("dowloadPhoto");
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
    }

    // Delete the user's photo (only in the user's table)
    const deletePhoto = async () => {
      try {
        deleting = true
        let { error } = await supabase
        .from('users')
        .update({ photo: null })
        .eq('id', user.id)

        photo = null;
        new_photo = null;
        url_photo = null;

        if (error) throw error
      } 
      catch (error) {
        if (error instanceof Error) {
          alert(error.message);
        }
      } 
      finally {
        deleting = false;
        getData();
      }
    }
</script>

{#if url_photo}
<div class="avatar image fmex-center">
    <img src={url_photo} alt={downloading ? 'Downloading ...' : ''} class="avatar image"/>
</div>
{/if}

<div class="body">
    <label class="button primary block" for="single">
      {uploading ? 'Uploading ...' : 'Upload a new photo'}
    </label>
    <span style="display:none">
      <input
        type="file"
        id="single"
        accept="image/*"
        bind:files
        on:change="{uploadAvatar}"
        disabled="{uploading}"
      />
    </span>
</div>

<div class="body">
  <label class="button primary block" for="delete">
    {deleting ? 'Deleting ...' : 'Delete the photo'}
  </label>
  <button id="delete" on:click={deletePhoto}></button>
</div>

<div class="footer flex-center">
<a href="/protected_routes/account/update" style="margin-top: 5px; margin-bottom: 15px">Back to edit my account</a>
</div>