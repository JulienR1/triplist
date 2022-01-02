<script lang="ts">
	import { SvgSource } from "./svg/SvgSource";

	import SvgIcon from "./SvgIcon.svelte";

	export let onRetry: () => void | undefined = undefined;
</script>

<div class="unknown-error">
	<figure>
		<SvgIcon src={SvgSource.ERROR} color={"var(--light-red)"} size={30} />
	</figure>
	<p>Une erreur est survenue</p>
	{#if onRetry}
		<button on:click={onRetry}>Réessayer</button>
	{/if}
</div>

<style lang="scss">
	.unknown-error {
		@import "../styles/sticky.scss";
		@include sticky-control;

		figure {
			width: fit-content;
			margin: 0 auto;
		}

		button {
			border: none;
			outline: none;
			cursor: pointer;
			padding: 3px 6px;
			color: var(--dark-blue);
			background-color: transparent;
			position: relative;

			&::after {
				content: "";
				left: 50%;
				width: 60%;
				bottom: -1px;
				display: block;
				position: absolute;
				transform: translateX(-50%);
				border: 1px solid var(--dark-blue);

				max-width: 0;
				visibility: hidden;
				transition: all 0.2s ease;
			}

			&:hover,
			&:focus {
				&::after {
					visibility: visible;
					max-width: 100%;
				}
			}
		}
	}
</style>
