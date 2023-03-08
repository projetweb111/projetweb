<script>
    import { page } from '$app/stores'
    import Account from './account/+page.svelte'
	  import LogOut from './signOut/LogOut.svelte';
  </script>
  
  <svelte:head>
    <title>Supabase + SvelteKit</title>
    <meta name="description" content="SvelteKit using supabase-js v2" />
  </svelte:head>
  
  {#if !$page.data.session}
  <form class="row flex-center flex">
    <div>Welcome !</div>
    <div class="col-6 form-widget">
      <a href="/signIn">Sign in</a>
    </div>
  </form>
  {:else}
  <form class="row flex-center flex">
    <div>Hola !</div>

    <div class="col-6 form-widget">
      <a href="/account">My account</a>
    </div>
  </form>
  <LogOut />
  {/if}
  