<script lang="ts">
	import { goto } from '$app/navigation';

	function gotoAccountPage() {
		goto('/protected_routes/account');
	}
</script>

<form class="form-widget">
	<div>
		<a href="/protected_routes/account">
			<button class="button block">Paramètres</button>
		</a>
	</div>
</form>

<style>
	a {
		text-decoration: none;
	}
</style>
