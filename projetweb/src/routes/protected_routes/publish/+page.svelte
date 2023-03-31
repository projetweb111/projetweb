<script lang="ts">
	import { goto } from '$app/navigation';
    import { page } from '$app/stores'
    import { supabase } from '$lib/supabaseClient'
    import { onMount } from 'svelte'

    let loading = false;
    onMount(() => {
      getAssos();
    })

    let myTitle : string | null = null;
    let myMessage : string | null = null;
    let myAssociation : string | null = null;
    let myAssociations = [];
    let user = $page.data.session.user;


    const addMessage = async () => {
        try {
          loading = true;
            const {data, error} = await supabase
              .from('post')
              .insert({association : myAssociation,
                 title: myTitle, 
                 content: myMessage, 
                 id_author: user.id})  
            
            if (error) throw error
        } catch (error) {
            if (error instanceof(Error)){
                console.log(error.message);
            }
        } 
        finally {
            loading = false;
            goto('/');
        }
    }

  const getAssos = async () => {
      try {
        loading = true
        let { data, error } = await supabase
          .from('members')
          .select('*,association(*)')
          .eq('id_user', user.id)
        
        if (data) {
            myAssociations.push(data);
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

<form on:submit|preventDefault="{addMessage}">

    <input bind:value="{myTitle}" type="text" placeholder="+ To Add a title">
    <input bind:value="{myMessage}" type="text" aria-label="Post a message" placeholder=" + to edit a message">
    <input type="submit" class="button block primary" value={loading ? 'Loading' : 'POST'}
    disabled={loading} />

</form>