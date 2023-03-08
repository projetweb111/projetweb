<script lang="ts">
    import { supabase } from '$lib/supabaseClient'
  
    let loading = false
  
    async function signOut() {
      try {
        loading = true
        let { error } = await supabase.auth.signOut()
        if (error) throw error
      } catch (error) {
        if (error instanceof Error) {
          alert(error.message)
        }
      } finally {
        loading = false
      }
    }
  </script>
  
  <form class="form-widget">
    <div>
      <button class="button block" on:click="{signOut}" disabled="{loading}">Sign Out</button>
    </div>
  </form>