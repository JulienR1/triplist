<script lang="ts">
	export let onRetry: () => void | undefined = undefined;
</script>

<div class="unknown-error">
	<figure>
		<img src="./assets/error_icon.svg" alt="error symbol" />
	</figure>
	<p>Une erreur est survenue</p>
	{#if onRetry}
		<button on:click={onRetry}>Réessayer</button>
	{/if}
</div>

<style lang="scss">
	.unknown-error {
		@import "../styles/style.scss";
		@include sticky-control;
	}
</style>
