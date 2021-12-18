<script lang="ts">
	import { getSvg } from "./svg/svgLoader";
	import type { SvgSource } from "./svg/SvgSource";

	export let src: SvgSource;
	export let size = 20;
	export let color: string = undefined;

	$: style = `--size: ${size}px; ${color ? `--color: ${color};` : ""}`;
</script>

{#await getSvg(src) then rawSvg}
	<i {style}> {@html rawSvg} </i>
{/await}

<style lang="scss">
	i {
		display: block;
		width: var(--size);
		height: var(--size);
		font-style: normal;

		:global(svg) {
			fill: var(--color);
			width: var(--size);
			height: var(--size);
		}
	}
</style>
