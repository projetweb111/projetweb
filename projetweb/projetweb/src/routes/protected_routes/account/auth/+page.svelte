<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores'
    import { supabase } from '$lib/supabaseClient'

    let user = $page.data.session.user;

	let email: string | undefined = user.email;
	let new_email: string | undefined;

	let loading = false;

	async function handleSubmit() {
		try {
			loading = true;

            if(!new_email) throw new Error('Please enter a new email');

            // Update the user's email
            const { data, error } = await supabase
                .auth
                .updateUser({email: new_email})

            // Update the user's email in the users table
            try {
                const { data, error } = await supabase
                    .from('users')
                    .update({ 
                        email: new_email? new_email : email})
                    .eq('id', user.id)

            } catch (error) {
                if (error instanceof Error) {
                    alert(error.message);
                }
            }
			loading = false;

            alert('Your email has been updated! Check your email for the confirmation link.');
            try {
                const { error } = await supabase.auth.signOut()
                if (error) throw error
            } catch (error) {
                if (error instanceof Error) {
                    alert(error.message);
                }
            }
            goto("/signIn",{invalidateAll: true});
		} 
		catch (error) {
			if (error instanceof Error) {
				alert(error.message);
			}
		} 
		finally {
			loading = false;
		}
	};

    async function resetPassword() {
        try {
            const { data, error } = await supabase
                .auth
                .resetPasswordForEmail(email? email : "", {
                    redirectTo: '/',
                })

            if (error) throw error
            alert('Check your email for the password reset link!')

            try {
                const { error } = await supabase.auth.signOut()
                if (error) throw error
            } catch (error) {
                if (error instanceof Error) {
                    alert(error.message);
                }
            }

        } catch (error) {
            if (error instanceof Error) {
                alert(error.message);
            }
        }
    }
</script>

<h1>Change your email and / or password</h1>

<form class="row flex-center flex" on:submit|preventDefault="{handleSubmit}">
    <div class="col-6 form-widget">
	    <label for="new_email">New email</label>
        <input class="inputField" type="new_email" placeholder="{new_email}" bind:value="{new_email}" />
      <div>
        <input type="submit" class="button block primary" value={loading ? 'Loading' : 'Save'}
        disabled={loading} />
      </div>
    </div>
</form>

<form class="row flex-center flex">
    <div class="col-6 form-widget">
      <button class="button block primary" on:click|preventDefault={resetPassword}>Reset password</button>
    </div>
</form>


<div class="footer flex-center">
    <a href="/protected_routes/account/update" style="margin-top: 5px; margin-bottom: 15px">Back to edit my account</a>
</div>