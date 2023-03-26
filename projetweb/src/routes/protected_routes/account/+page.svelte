<script lang="ts">
	import { page } from '$app/stores'
    import { supabase } from '$lib/supabaseClient'
    import { onMount } from 'svelte'

	let session = $page.data.session;
    console.log(session);
    let user = $page.data.session.user;
    console.log(user);

	let first_name: string | null = null;
	let last_name: string | null = null;
	let pseudo: string | null = null;
	let email: string | null = null;
	let status: string | null = null;
	let promo: string | null = null;

	let loading = false;
    onMount(() => {
      getData();
    })


    // GET the user's data from the database
    const getData = async () => {
      try {
        loading = true

        let { data, error } = await supabase
        .from('users')
        .select('first_name, last_name, pseudo, email, status, promo')
        .eq('id', user.id)
        .single()

        if (data) {
          first_name = data.first_name
          last_name = data.last_name
          pseudo = data.pseudo
          email = data.email
          status = data.status
          promo = data.promo
        }

        if (error) throw error
      } 
      catch (error) {
        if (error instanceof Error) {
          alert(error.message)
        }
      } 
      finally {
        loading = false
      }
    };
</script>