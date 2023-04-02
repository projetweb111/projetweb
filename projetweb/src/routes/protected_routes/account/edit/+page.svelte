<script lang="ts">
	import { goto } from '$app/navigation';
    import { page } from '$app/stores'
    import { supabase } from '$lib/supabaseClient'
    import { onMount } from 'svelte'

    let loading = false;
    onMount(() => {
      getAssos();
      console.log(myAssociations)
    })

    let myTitle : string | null = null;
    let myMessage : string | null = null;
    let myAssociation : string | null = null;
    let myAssociations: any[] = [];
    let user = $page.data.session.user;



    const addMessage = async () => {
        try {
          loading = true;
          console.log(myAssociation.association.name_association);
            const {data, error} = await supabase
              .from('post')
              .insert({association : myAssociation.association.name_association,
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
            myAssociations = data;
            console.log(myAssociations);
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
    <select bind:value={myAssociation}>
      {#each myAssociations as asso}
			  <option value={asso}>{asso.association.name_association}</option>
      {/each}
	  </select>
    <input type="submit" class="button block primary" value={loading ? 'Loading' : 'POST'}
    disabled={loading} />
    
</form>