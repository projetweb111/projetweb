<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { supabase } from '$lib/supabaseClient';

	let user = $page.data.session.user;

	let email: string | undefined = user.email;
	let new_email: string | undefined;

	let loading = false;

	async function handleSubmit() {
		try {
			loading = true;

			if (!new_email) throw new Error('Please enter a new email');

			// Update the user's email
			const { data, error } = await supabase.auth.updateUser({ email: new_email });

			// Update the user's email in the users table
			try {
				const { data, error } = await supabase
					.from('users')
					.update({
						email: new_email ? new_email : email
					})
					.eq('id', user.id);
			} catch (error) {
				if (error instanceof Error) {
					alert(error.message);
				}
			}
			loading = false;

			alert('Your email has been updated! Check your email for the confirmation link.');
			try {
				const { error } = await supabase.auth.signOut();
				if (error) throw error;
			} catch (error) {
				if (error instanceof Error) {
					alert(error.message);
				}
			}
			goto('/signIn', { invalidateAll: true });
		} catch (error) {
			if (error instanceof Error) {
				alert(error.message);
			}
		} finally {
			loading = false;
		}
	}

	async function resetPassword() {
		try {
			const { data, error } = await supabase.auth.resetPasswordForEmail(email ? email : '', {
				redirectTo: '/'
			});

			if (error) throw error;
			alert('Check your email for the password reset link!');

			try {
				const { error } = await supabase.auth.signOut();
				if (error) throw error;
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

<div id="back-button">
	<a id="return" href="/protected_routes/account/update">
		<button id="button1" class="button buttonPerso3 block primary"> &lt Retour</button>
	</a>
</div>

<div class="myTitle" style="background-color: var(--custom-color2)">
	<div class="myTitle-text">
		<h1>Changer vos informations de connexion</h1>
	</div>
</div>
<div class="myBody">
	<div class="myBody-text">
		<form class="row flex-center flex" on:submit|preventDefault={handleSubmit}>
			<div class="col-8 form-widget">
				<label for="new_email">Nouvelle adresse mail</label>
				<input class="inputField" type="new_email" placeholder={new_email} bind:value={new_email} />
				<div>
					<input
						type="submit"
						class="button buttonPerso1 block primary"
						value={loading ? 'Loading' : 'Enregistrer'}
						disabled={loading}
					/>
				</div>
			</div>
		</form>

		<form class="row flex-center flex">
			<div class="col-8 form-widget">
				<button class="buttonPerso4 block" on:click|preventDefault={resetPassword}
					>Réinitialiser le mot de passe</button
				>
			</div>
		</form>
	</div>
</div>

<style>
	h1 {
		white-space: nowrap;
	}

	.inputField {
		margin-top: 0rem;
		margin-bottom: 1rem;
	}

	label {
		margin-bottom: 0.1rem;
		padding-bottom: 0rem;
	}

	.form-widget {
		margin-top: 1rem;
		margin-bottom: 1rem;
		gap: 10px;
	}

	/* for return button */
	#back-button {
		z-index: 5;
		position: absolute;
		left: 20%;
		top: 30%;
		margin: 1rem;
		width: fit-content;
	}

	#return {
		text-decoration: none;
	}

	#button1 {
		display: flex;
		align-items: center;
		justify-content: center;
		border: 1px solid var(--custom-color1);
		background-color: var(--custom-color1);
		text-transform: none !important;
		transition: all 0.2s ease;
	}

	#button1:hover {
		background-color: #2a2a2a;
		border: 1px solid var(--custom-color1);
	}
</style>
