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

<div id="back-button">
	<a id="return" href="/">
		<button id="button1" class="button buttonPerso3 block primary"> &lt Retour</button>
	</a>
</div>

<div class="myTitle" style="background-color: var(--custom-color2-2)">
	<div class="myTitle-text">
		<h1>Associations</h1>
	</div>
</div>
    
<div class="myBody">
	<div class="myBody-text">
		<div class="buttons form-widget">
    {#if associations}
      {#each associations as association}
        <div class="association">
          <form action="/protected_routes/association/{association.name_association}" method="get">
            <button class="buttonLink button block" type="submit"  >
              {association.name_association}
            </button>            
          </form>
          <br>
    
        </div>
    
      {/each}
    {:else}
      <p>loading...</p>
    {/if}

    </div>
    </div>
    </div>

    <style>
      .buttons {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        margin-top: 2rem;
        /* text-align: center;*/
        justify-content: space-around;
        padding: 0 8rem;
        width: 100%;
      }
    
      .buttonLink {
        text-decoration: none;
        width: 100%;
        margin: 5px;
      }

      /* for return button */
      #back-button {
        z-index: 5;
        position: absolute;
        left: 12%;
        top: 30%;
        margin: 1rem;
        width: fit-content;
      }
    
      #return {
        text-decoration: none;
      }
    
      #button1 {
        display: flex;
        align-items: center;
        justify-content: center;
        border: 1px solid var(--custom-color1);
        background-color: var(--custom-color1);
        text-transform: none !important;
        transition: all 0.2s ease;
      }
    
      #button1:hover {
        background-color: #2a2a2a;
        border: 1px solid var(--custom-color1);
      }
    </style>