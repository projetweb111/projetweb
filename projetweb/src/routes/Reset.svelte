<script lang="ts">
    import { goto } from '$app/navigation';
    import { supabase } from '$lib/supabaseClient'
  
    let loading = false;
    let new_password: string;
  
    const handleSubmit = async () => {
      try {
        loading = true
        
        const { error } = await supabase
          .auth
          .updateUser({password: new_password})
  
        if (error) throw error

        try {
            const { error } = await supabase.auth.signOut()
            if (error) throw error
        } catch (error) {
            if (error instanceof Error) {
                alert(error.message);
            }
        }
        goto("/signIn",{invalidateAll: true})
      } catch (error) {
        if (error instanceof Error) {
          alert(error.message)
        }
      } finally {
        loading = false
      }
    }
  </script>
  
  
  <form class="row flex-center flex" on:submit|preventDefault="{handleSubmit}">
    <div class="col-6 form-widget">
      <h1 class="header">Reset your password</h1>
      <div>
        <input class="inputField" type="new_password" placeholder="Your new password" bind:value="{new_password}" />
      </div>
      <div>
        <input type="submit" class="button block" value={loading ? 'Saving ...' : 'Save'}
        disabled={loading} />
      </div>
    </div>
  </form>