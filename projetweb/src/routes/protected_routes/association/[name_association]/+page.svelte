<script lang="ts">
    import { supabase } from '$lib/supabaseClient'
    export let data

    let downloading = false;
    // Download the association's logo from the database
    /**
	const dowloadPhoto = async () => {
      if (data.association.logo) {
        try {
          downloading = true
          const { data, error } = await supabase
          .storage
          .from('avatars')
          .download(`${.id}/${photo}`)

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
    **/
    </script>

<form class="row flex-left flex">
    <h1><strong>{data.association.name_association}</strong></h1>
    <a  href="/protected_routes/account/photo"  class="avatarPlaceholder" style="margin-left: auto;">
        <img src={data.association.photo_url} alt={data.association.photo_url ? 'Avatar' : 'Pas de logo'} class="avatar image"/>
    </a>
</form>
<form class="row flex-left flex">
    <h1>Description</h1>
</form>

<form class="row flex-left flex">
    <h1>{data.association.description}</h1>
</form>