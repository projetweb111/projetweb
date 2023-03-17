<script>
    import { page } from '$app/stores'
	import Search from './search.svelte';
    
  </script>
  
  
  {#if $page.data.session}
  <Search session="{$page.data.session}" />
    {:else}
    <h1>Please sign in to continue</h1>
    {/if}