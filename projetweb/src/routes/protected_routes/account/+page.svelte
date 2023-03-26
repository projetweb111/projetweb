<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionData, PageData } from './$types';

	export let data: PageData;
	export let form: ActionData;

	let { session, user } = data;

    let profileForm: any;
	let loading = false;
	let first_name: string | null = user?.first_name;
	let last_name: string | null = user?.last_name;
	let pseudo: string | null = user?.pseudo;
	let email: string | null = user?.email;
	let status: string | null = user?.status;
	let promo: string | null = user?.promo;

	function handleSubmit() {
		loading = true;
		return async () => {
			loading = false;
		};
	}
</script>

<div class="form-widget">
	<form
		class="form-widget"
		method="post"
		action="?/update"
		use:enhance={handleSubmit}
		bind:this={profileForm}
	>
		<div>
			<label for="first_name">First Name</label>
			<input id="first_name" name="first_name" type="text" value={form?.first_name ?? first_name} />
		</div>

        <div>
			<label for="last_name">Last Name</label>
			<input id="last_name" name="last_name" type="text" value={form?.last_name ?? last_name} />
		</div>

        <div>
            <label for="pseudo">Pseudo</label>
            <input id="pseudo" name="pseudo" type="text" value={form?.pseudo ?? pseudo} />
        </div>

        <div>
			<label for="email">Email</label>
			<input id="email" type="text" value={session.user.email} disabled />
		</div>

        <div>
            <label for="status">Status</label>
            <input id="status" name="status" type="text" value={form?.status ?? status} />
        </div>

        <div>
            <label for="promo">Promo</label>
            <input id="promo" name="promo" type="text" value={form?.promo ?? promo} />
        </div>

		<div>
			<input
				type="submit"
				class="button block primary"
				value={loading ? 'Loading...' : 'Update'}
				disabled={loading}
			/>
		</div>
	</form>
</div>