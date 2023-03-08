<script>
    import { page } from '$app/stores'
    import Account from './accountUpdate/Account.svelte'
    import Auth from './signIn/Auth.svelte'
  </script>
  
  <svelte:head>
    <title>Supabase + SvelteKit</title>
    <meta name="description" content="SvelteKit using supabase-js v2" />
  </svelte:head>
  
  {#if !$page.data.session}
  <Auth />
  {:else}
  <Account session="{$page.data.session}" />
  {/if}
  