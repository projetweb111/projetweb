<script lang="ts">
	import { goto } from '$app/navigation';
	import { supabase } from '$lib/supabaseClient';

	let loading = false;
	let email: string;
	let password: string;
	let first_name: string;
	let last_name: string;

	const handleSignUp = async () => {
		try {
			loading = true;
			const { data, error } = await supabase.auth.signUp({
				email,
				password,
				options: {
					data: {
						first_name,
						last_name,
						email
					}
				}
			});
			if (error) throw error;
			goto('/signIn', { invalidateAll: true });
		} catch (error) {
			if (error instanceof Error) {
				alert(error.message);
			}
		} finally {
			loading = false;
		}
	};
</script>

<div class="myTitle" style="background-color: var(--custom-color2)">
	<div class="myTitle-text">
		<h1 class="header">Créer un compte</h1>
	</div>
</div>
<div class="myBody">
	<div class="myBody-text">
		<p class="description">Créer un compte avec votre email</p>
	</div>
	<div class="form-signIn">
		<form class="row" on:submit|preventDefault={handleSignUp}>
			<div class="form-widget">
				<div>
					<input class="inputField" type="text" placeholder="Prénom" bind:value={first_name} />
					<input class="inputField" type="text" placeholder="Nom" bind:value={last_name} />
				</div>
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
						value={loading ? 'Loading' : 'Créer un compte'}
						disabled={loading}
					/>
				</div>
			</div>
		</form>
	</div>
</div>

<style>
	.form-signIn {
		padding-left: 10%;
		padding-right: 10%;
		align-items: center;
	}
</style>
