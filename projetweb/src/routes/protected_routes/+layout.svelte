<script lang="ts">
    import { page } from '$app/stores';
</script>

{#if !$page.data.session}
<div class="container" style="padding: 50px 0 100px 0">
    You are not logged in !
</div>
{:else}
<div class="container" style="padding: 50px 0 100px 0">
    <slot />
</div>
{/if}