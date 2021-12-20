<script lang="ts">
	import { getContext } from "svelte";
	import type { EditableTextCallback } from "./EditableTextCallback";

	export let editableTextID: {};
	export let callback: EditableTextCallback;

	const callbackFct = getContext(editableTextID)[callback];
	if (!callback || !callbackFct) {
		throw new Error("No editable text parent.");
	}
</script>

<button on:click={callbackFct}>
	<slot />
</button>

<style lang="scss"></style>
