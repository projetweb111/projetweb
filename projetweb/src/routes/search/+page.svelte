<script>
    import { page } from '$app/stores'
	import Search from './search.svelte';
    
  </script>
  
  
  {#if $page.data.session}
  <Search session="{$page.data.session}" />
    {:else}
    <h1>Veuillez se connecter</h1>
    <a href="/signIn">Sign in </a>
    {/if}