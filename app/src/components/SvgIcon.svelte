<script lang="ts">
	import { afterUpdate } from "svelte";

	export let src: string;
	export let size = 20;
	export let color: string = undefined;

	let svgElement;

	afterUpdate(() => {
		updateSvgStyle();
	});

	const updateSvgStyle = () => {
		if (svgElement) {
			const svgDocument: Document = svgElement.contentDocument;
			const svg = svgDocument.querySelector("svg");

			svg.width.baseVal.value = size;
			svg.height.baseVal.value = size;
			svg.style.fill = color;
		}
	};
</script>

<object title="svg icon" data={src} type="image/svg+xml" on:load={updateSvgStyle} bind:this={svgElement} />

<style lang="scss">
</style>
