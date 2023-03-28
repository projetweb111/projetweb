<script lang="ts">
	import { goto, invalidateAll } from '$app/navigation';
    import { page } from '$app/stores'
	  import { supabase } from '$lib/supabaseClient';
	import Reset from './Reset.svelte';

    let reset: boolean = false;

    supabase.auth.onAuthStateChange((event, session) => {
    if (event == 'PASSWORD_RECOVERY') {
      console.log('PASSWORD_RECOVERY', session)

      // show screen to update user's password
      reset = true;
    }else {
      reset = false;
    }
    }
    )
  </script>
  
  <svelte:head>
    <title>Home</title>
  </svelte:head>
  
  {#if reset}
  <Reset />
  {:else}
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
  {/if}