<script lang="ts">
	export let size = 80;
	export let color = "#d0d9db";
</script>

<div class="loader">
	<div class="ring" style="--size: {size}px; --color: {color};">
		<div />
		<div />
		<div />
		<div />
	</div>
</div>

<style lang="scss">
	.loader {
		@import "../styles/style.scss";
		@include sticky-control;
	}

	.ring {
		display: inline-block;
		position: relative;
		width: var(--size);
		height: var(--size);

		div {
			--thickness: calc(0.1 * var(--size));
			--inner-size: calc(var(--size) - 2 * var(--thickness));

			display: block;
			position: absolute;
			box-sizing: border-box;
			width: var(--inner-size);
			height: var(--inner-size);
			margin: var(--thickness);

			border-radius: 50%;
			border: var(--thickness) solid var(--color);
			border-color: var(--color) transparent transparent transparent;
			animation: ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;

			@for $i from 1 through 4 {
				&:nth-child(#{$i}) {
					animation-delay: ($i + 1) * -0.15s;
				}
			}
		}
	}

	@keyframes ring {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
</style>
