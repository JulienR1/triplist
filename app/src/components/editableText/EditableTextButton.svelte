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

<style lang="scss">
	button {
		background-color: none;
		height: fit-content;
		outline: none;
		border: none;
		padding: 0;
		cursor: pointer;
		transition: all 0.15s ease;

		&:hover,
		&:focus,
		&:focus-within {
			box-shadow: 0 0 6px -1px var(--dark-grey);
			transform: translateY(-1px);
		}

		&:active {
			transform: translateY(0);
		}
	}
</style>
