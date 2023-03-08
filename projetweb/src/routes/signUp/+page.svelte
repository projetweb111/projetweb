<script lang="ts">
    import { supabase } from '$lib/supabaseClient'
  
    let loading = false
    let email: string
    let password: string
    let first_name: string
    let last_name: string
  
    const handleSignUp = async () => {
      try {
        loading = true
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              first_name,
              last_name,
            },
          },
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
  
  <form class="row flex-center flex" on:submit|preventDefault="{handleSignUp}">
    <div class="col-6 form-widget">
      <h1 class="header">Authentification - Sign up</h1>
      <p class="description">Give us your name and sign up with your email and password</p>
      <div>
        <input class="inputField" type="text" placeholder="Your first name" bind:value="{first_name}" />
        <input class="inputField" type="text" placeholder="Your last name" bind:value="{last_name}" />
      </div>
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