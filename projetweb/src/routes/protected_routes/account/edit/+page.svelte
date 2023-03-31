<script lang ="ts">

    import { page } from '$app/stores'
    import { supabase } from '$lib/supabaseClient'
    import { onMount } from 'svelte'

    let loading = false;
    onMount(() => {
      getAssos();
    })

    let myTitle = "";
    let myMessage = "";
    let myAssociation = "";
    let myAssociations = [];
    let user = $page.data.session.user;

    async function addMessage(){
        console.log(user.id);
        try {
            const {data, error} = await supabase.from('post').insert({association : myAssociation, title: myTitle, content: myMessage, id_author: user.id})  
            console.log(data);
            if (error) throw error
        } catch (error) {
            if (error instanceof(Error)){
                console.log(error.message);
            }
        } 
    }

    const getAssos = async () => {
      try {
        loading = true

        let { data, error } = await supabase
        .from('members')
        .select('*,association(*)')
        .eq('id_user', user.id)
        console.log(data);

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
    <button aria-label = "sending"> POST </button>

</form>


