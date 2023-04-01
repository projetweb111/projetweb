<script lang="ts">
	import '../styles.css';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { supabase } from '$lib/supabaseClient';

	let loading = false;
	let email: string;
	let password: string;

	const handleLogin = async () => {
		try {
			loading = true;
			const { data, error } = await supabase.auth.signInWithPassword({
				email,
				password
			});
			if (error) throw error;
			goto('/', { invalidateAll: true });
		} catch (error) {
			if (error instanceof Error) {
				alert(error.message);
			}
		} finally {
			loading = false;
		}
	};

	async function resetPassword() {
		try {
			if (!email) throw new Error('Please enter your email');

			const { data, error } = await supabase.auth.resetPasswordForEmail(email ? email : '', {
				redirectTo: '/'
			});

			if (error) throw error;
			alert('Check your email for the password reset link!');
		} catch (error) {
			if (error instanceof Error) {
				alert(error.message);
			}
		}
	}
</script>

{#if !$page.data.session}
	<div class="myTitle" style="background-color: var(--custom-color2)">
		<div class="myTitle-text">
			<h1>Se connecter</h1>
		</div>
	</div>
	<div class="myBody">
		<div class="myBody-text">
			<p class="description">Connectez-vous avec votre adresse mail et votre mot de passe</p>
		</div>
		<div class="form-signIn">
			<form class="row" on:submit|preventDefault={handleLogin}>
				<div class="form-widget">
					<div>
						<input class="inputField" type="email" placeholder="Email" bind:value={email} />
						<input
							class="inputField"
							type="password"
							placeholder="Mot de passe"
							bind:value={password}
						/>
					</div>
					<div>
						<input
							type="submit"
							class="button block"
							value={loading ? 'Loading' : 'Se connecter'}
							disabled={loading}
						/>
					</div>
				</div>
			</form>
			<form class="row">
				<div class="form-widget reinit">
					<button class="button block primary" on:click|preventDefault={resetPassword}
						>Réinitialiser le mot de passe</button
					>
				</div>
			</form>
		</div>
	</div>
{:else}
	<h1 class="header">Vous êtes déjà connecté</h1>
{/if}

<style>
	.reinit {
		margin-top: 0.8rem;
		width: 100%;
		justify-content: center;
	}

	.form-signIn {
		padding-left: 10%;
		padding-right: 10%;
		align-items: center;
	}
</style>
