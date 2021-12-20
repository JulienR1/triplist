<script lang="ts">
	import { getContext, createEventDispatcher } from "svelte";
	import type { EditableTextCallback } from "./EditableTextCallback";

	export let editableTextID: {};
	export let callback: EditableTextCallback;

	const dispatch = createEventDispatcher();

	const callbackFct = getContext(editableTextID)[callback];
	if (!callback || !callbackFct) {
		throw new Error("No editable text parent.");
	}
</script>

<button
	on:click={(event) => {
		callbackFct();
		dispatch("click", event);
	}}
>
	<slot />
</button>

<style lang="scss"></style>
