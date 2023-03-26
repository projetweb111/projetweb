<script lang="ts">
  import { supabase } from '$lib/supabaseClient'
  import { invalidateAll } from '$app/navigation'
  import { onMount } from 'svelte'
  import './styles.css'
	import { page } from '$app/stores';
	import SignOut from './signOut/signOut.svelte';

  onMount(() => {
    const { data: { subscription }} = supabase.auth.onAuthStateChange(() => {
      invalidateAll();
    })

    return () => {
      subscription.unsubscribe()
    }
  })
</script>

<nav >
  <a href= "/">🏠 Home</a>
  {#if !$page.data.session}
    <a href= "/signIn">Sign in</a>
    <a href= "/signUp">Sign up</a>
  {:else}
    <a href="/protected_routes/actualite">Actualités</a>
    <a href="/protected_routes/search"> Search </a>
    <a href= "/protected_routes/account">My account</a>
    <SignOut />
  {/if}
  
</nav>

<style>
  nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem;
    background-color: #911616;
  }
  nav a {
    color: #ffffff;
    text-decoration: none;
    font-size: 1.5rem;
    padding: 0.5rem;
  }
  nav a:hover {
    color: #000000;
  }
</style>

<div class="container" style="padding: 50px 0 100px 0">
  <slot />
</div>