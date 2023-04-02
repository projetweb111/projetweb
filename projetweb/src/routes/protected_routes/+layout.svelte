<script lang="ts">
	import { page } from '$app/stores';
</script>

{#if !$page.data.session}
	<div class="myTitle">
		<div class="myTitle-text">
			<h1>Accès interdit</h1>
		</div>
	</div>
	<div class="myBody">
		<div class="myBody-text">
			<div class="container" style="padding: 50px 0 100px 0">Vous n'êtes pas connecté</div>
		</div>
	</div>
{:else}
	<div class="main">
		<slot />
	</div>
{/if}

<style>
</style>
