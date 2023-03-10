<script>
    import { page } from '$app/stores'
	  import SignOut from './signOut/signOut.svelte';
  </script>
  
  <svelte:head>
    <title>Supabase + SvelteKit</title>
    <meta name="description" content="SvelteKit using supabase-js v2" />
  </svelte:head>
  
  {#if !$page.data.session}
  <form class="row flex-center flex">
    <h1 class="header">Welcome !</h1>
    <p>Please sign in to continue</p>
  </form>
  <form class="row flex-right flex">
    <div class="col-6 button-block">
      <a href="/signIn">Sign in</a>
    </div>
  </form>
  {:else}
  <form class="row flex-center flex">
    <h1 class="header">Welcome !</h1>
    <p>You are logged in as {$page.data.session.user.email}</p>
  </form>
  <form class="row flex-right flex">
    <div class="col-6 button-block">
      <a href="/account">My account</a>
    </div>
  </form>
  <SignOut />
  {/if}