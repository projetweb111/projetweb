<!-- src/routes/account/+page.svelte -->
<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores'
    import { supabase } from '$lib/supabaseClient'
    import { onMount } from 'svelte'

    let user = $page.data.session.user;

	let first_name: string | null = null;
	let last_name: string | null = null;
	let pseudo: string | null = null;
	let email: string | null = null;
	let status: string | null = null;
	let promo: string | null = null;
  
	let new_first_name: string | null = null;
	let new_last_name: string | null = null;
	let new_pseudo: string | null = null;
	let new_status: string | null = null;
	let new_promo: string | null = null;

	let loading = false;
	async function handleSubmit() {
		try {
			loading = true;
			let { error } = await supabase
			.from('users')
			.update({ first_name: new_first_name? new_first_name : first_name,
				 last_name: new_last_name? new_last_name : last_name,
				 pseudo: new_pseudo? new_pseudo : pseudo,
				 promo: new_promo? new_promo : promo })
			.eq('id', user.id)

			if (error) throw error
			
			loading = false;
			goto('/protected_routes/account');
		} 
		catch (error) {
			if (error instanceof Error) {
				alert(error.message);
			}
		} 
		finally {
			loading = false;
		}
	}

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


<form class="row flex-center flex">
    <h1>Edit my account</h1>
</form>

<form class="row flex-center flex" on:submit|preventDefault="{handleSubmit}">
	<div class="col-7 form-widget">
		<div>
		<label for="email">Email</label>
        <p>{email}</p>
		</div>
		<a class="button block" href="/protected_routes/account/auth">Change email and password</a>
		
		<div>
		<label for="status">Status</label>
		<p>{status}</p>
		</div>
		<a class="button block" href="/protected_routes/account/status">Ask for a new status</a>
	</div>
	
    <div class="col-8 form-widget">
      <div>
		<label for="first_name">First name</label>
        <input class="inputField" type="first_name" placeholder="{first_name}" bind:value="{new_first_name}" />
		<label for="last_name">Last name</label>
		<input class="inputField" type="last_name" placeholder="{last_name}" bind:value="{new_last_name}" />
		<label for="pseudo">Pseudo</label>
		<input class="inputField" type="pseudo" placeholder="{pseudo}" bind:value="{new_pseudo}" />
		<label for="promo">Promo</label>
		<input class="inputField" type="promo" placeholder="{promo}" bind:value="{new_promo}" />
      </div>
      <div>
        <input type="submit" class="button block primary" value={loading ? 'Loading' : 'Save'}
        disabled={loading} />
      </div>
    </div>
</form>