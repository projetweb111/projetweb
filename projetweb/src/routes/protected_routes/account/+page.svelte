<script lang="ts">
	import { page } from '$app/stores'
    import { supabase } from '$lib/supabaseClient'
    import { onMount } from 'svelte'

    let user = $page.data.session.user;

	let first_name: string | null = null;
	let last_name: string | null = null;
	let pseudo: string | null = null;
	let email: string | null = null;
	let status: string | null = null;
	let promo: string | null = null;

	let loading = false;
    onMount(() => {
      getData();
    })


    // GET the user's data from the database
    const getData = async () => {
      try {
        loading = true

        let { data, error } = await supabase
        .from('users')
        .select('first_name, last_name, pseudo, email, status, promo')
        .eq('id', user.id)
        .single()

        if (data) {
          first_name = data.first_name
          last_name = data.last_name
          pseudo = data.pseudo
          email = data.email
          status = data.status
          promo = data.promo
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


<form class="row flex-center flex">
    <h1>My account</h1>
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
    <a class="button" href="/protected_routes/account/update">Edit my account</a>
</form>


{:else}
<p>Loading ...</p>
{/if}