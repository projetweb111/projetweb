<script>
    import { page } from '$app/stores'
  </script>
  
  <svelte:head>
    <title>Home</title>
  </svelte:head>
  
  {#if !$page.data.session}
  <form class="row flex-center flex">
    <h1 class="header">Welcome !</h1>
  </form>
  <form class="row flex-center flex">
    <p class="form-widget" >Please sign in to continue</p>
  </form>
  {:else}
  <form class="row flex-center flex">
    <h1 class="header">Welcome {$page.data.session.user.email} !</h1>
  </form>
  {/if}