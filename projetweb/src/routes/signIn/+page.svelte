<script lang="ts">
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
      } catch (error) {
        if (error instanceof Error) {
          alert(error.message)
        }
      } finally {
        loading = false
      }
    }
  </script>
  
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
      <div>
        <a href="/signUp">Sign up</a>
      </div>
    </div>
  </form>