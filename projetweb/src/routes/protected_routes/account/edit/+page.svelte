<script lang = "ts">

    import { page } from '$app/stores'
    import { supabase } from '$lib/supabaseClient'
	import { text } from 'svelte/internal';

    let myTitle = "";
    let myMessage = "";
    let myAssociation = "";
    let user = $page.data.session.user;

    async function addMessage(){
        console.log(user.id);
        try {
            const {data, error} = await supabase.from('post').insert({association : "BDE", title: myTitle, content: myMessage, id_author: user.id})  
            console.log(data);
            if (error) throw error
        } catch (error) {
            if (error instanceof(Error)){
                console.log(error.message);
            }
        } 
    }

</script>

<form on:submit|preventDefault="{addMessage}">

    <input bind:value="{myTitle}" type="text" placeholder="+ To Add a title">
    <input bind:value="{myMessage}" type="text" aria-label="Post a message" placeholder=" + to edit a message">
    <button aria-label = "sending"> POST </button>

</form>


