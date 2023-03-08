<script>
  import { page } from '$app/stores'
  import Actualite from './actualite.svelte'
</script>


{#if !$page.data.session}
<Actualite session="{$page.data.session}" />
  {:else}
  <h1>Veuillez se connecter</h1>
  <a href="/">Sign in </a>
  {/if}
