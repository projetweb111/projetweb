<script lang="ts">
	import { page } from '$app/stores'
    import { supabase } from '$lib/supabaseClient'
    import { onMount } from 'svelte'

    let user = $page.data.session.user;

	let assos : any[] | null = null;

	let loading = false;
    onMount(() => {
      getAssos();
    })


    // GET the user's assos from the database
    const getAssos = async () => {
      try {
        loading = true

        let { data, error } = await supabase
        .from('members')
        .select('*,association(*)')
        .eq('id_user', user.id)
        console.log(data);

        if (data) {
            assos = data
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
    <h1>Mes assos</h1>
</form>
    
{#if loading}
    <div class="row flex-center flex">
        <h2>Chargement...</h2>
    </div>
{:else if assos}
    {#each assos as asso}
        <div>
            <h1>{asso.association.name_association}</h1>
            <details>
                <summary>Description</summary>
                <p>{asso.association.description}</p>
            </details>
        </div>
    {/each}
{:else}
    <div class="row flex-center flex">
        <h2>Aucune asso</h2>
    </div>
{/if}