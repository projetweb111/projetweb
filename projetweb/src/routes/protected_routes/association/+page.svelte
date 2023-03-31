<script lang="ts">
    import { onMount } from 'svelte'
    import type { AuthSession } from '@supabase/supabase-js'
    import { supabase } from '$lib/supabaseClient'
       
       
    
    
    let loading = false
    let associations: any[] | null =null
    
    
    
    // should update when we have auth
    const getAssociations= async () => {
        try {
          loading = true
        let { data, error } = await supabase
        .from('association')
        .select('name_association')  
         
          if (data) {       
            associations=data     
          }
      
          if (error) throw error
        } catch (error) {
          if (error instanceof Error) {
            alert(error.message)
          }
        } finally {
          loading = false
        }
      };
    
      onMount(() => {
      getAssociations()
    })

    </script>
    <title>Associations</title>
    <h1>Associations</h1>
    
    {#if associations}
      {#each associations as association}
        <div class="association">
          <form action="/protected_routes/association/{association.name_association}" method="get">
            <button class="button primary block" type="submit"  >
              {association.name_association}
            </button>            
          </form>
          <br>
    
        </div>
    
      {/each}
    {:else}
      <p>loading...</p>
    {/if}