<script lang="ts">
    import { onMount } from 'svelte'
    import type { AuthSession } from '@supabase/supabase-js'
    import { supabase } from '$lib/supabaseClient'
       
       
    
    
    let loading = false
    let associations: any[] | null =null
    export let name_asso: string | null = null
    
    
    
    // should update when we have auth
    const getAssociations= async () => {
        try {
          loading = true
      
          //const { data, error, status } = await supabase
            //.from('post')
            //.select(`username, com, association, title, content, count_likes, users!inner(*)`)
        let { data, error } = await supabase
        .from('association')
        .select('name_association')
        
        console.log(data)
      
          if (data) {
            
            associations=data
            console.table(associations);
      
      
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

    export const getNameAsso = () => {
      return name_asso
    }
    </script>
    <title>Associations</title>
    <h1>Associations</h1>
    
    {#if associations}
      {#each associations as association}
        <div class="association">
          <form action="/protected_routes/association/{association.name_association}" method="get">
            <button type="submit" class="btn btn-primary" on:click={()=>{name_asso=association.name_association}}>
              {association.name_association}
            </button>            
          </form>
    
        </div>
    
      {/each}
    {:else}
      <p>loading...</p>
    {/if}