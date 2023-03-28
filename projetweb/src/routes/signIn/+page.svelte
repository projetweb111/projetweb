<script lang="ts">
	  import { goto } from '$app/navigation';
	  import { page } from '$app/stores';
    import { supabase } from '$lib/supabaseClient'
  
    let loading = false
    let email: string
    let password: string
  
    const handleLogin = async () => {
      try {
        loading = true
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
         })
        if (error) throw error
        goto("/",{invalidateAll: true})
      } catch (error) {
        if (error instanceof Error) {
          alert(error.message)
        }
      } finally {
        loading = false
      }
    }

    async function resetPassword() {
        try {

          if(!email) throw new Error('Please enter your email');
          
            const { data, error } = await supabase
                .auth
                .resetPasswordForEmail(email? email : "", {
                    redirectTo: '/',
                })

            if (error) throw error
            alert('Check your email for the password reset link!')

        } catch (error) {
            if (error instanceof Error) {
                alert(error.message);
            }
        }
    }
  </script>
  
  {#if !$page.data.session}
  <form class="row flex-center flex" on:submit|preventDefault="{handleLogin}">
    <div class="col-6 form-widget">
      <h1 class="header">Authentification - Sign in</h1>
      <p class="description">Sign in with your email and password</p>
      <div>
        <input class="inputField" type="email" placeholder="Your email" bind:value="{email}" />
        <input class="inputField" type="password" placeholder="Your password" bind:value="{password}" />
      </div>
      <div>
        <input type="submit" class="button block" value={loading ? 'Loading' : 'Sign in'}
        disabled={loading} />
      </div>
    </div>
  </form>

  <form class="row flex-center flex">
    <div class="col-6 form-widget">
      <button class="button block primary" on:click|preventDefault={resetPassword}>Reset password</button>
    </div>
  </form>
  {:else}
  <h1 class="header">You just signed in</h1>
  {/if}