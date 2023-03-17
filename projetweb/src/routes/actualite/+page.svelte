<script>
  import { page } from '$app/stores'
  import Actualite from './actualite.svelte'
</script>


{#if $page.data.session}
<Actualite session="{$page.data.session}" />
  {:else}
  <h1>Please sign in to continue</h1>
  {/if}
