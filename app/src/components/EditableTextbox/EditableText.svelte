<script lang="ts">
	import { createEventDispatcher } from "svelte";
	import { clickOutside } from "./../directives/clickOutside";
	import type { ConfirmationFct } from "./ConfirmationFct";

	export let value: string;
	export let freshStart: boolean = false;
	export let onRequestConfirmation: ConfirmationFct = async (newValue, oldValue) => true;

	const dispatch = createEventDispatcher();

	let editing: boolean = false;
	let requestedValue: string;

	let editionBox: HTMLElement;

	const startEditing = () => {
		if (editing) {
			return;
		}

		editing = true;
		requestedValue = !freshStart ? value : "";
		requestAnimationFrame(() => editionBox.focus());
	};

	const stopEditing = () => {
		editing = false;
	};

	const onInput = (event) => {
		dispatch("input", event);
	};

	const onChangeComplete = async (event) => {
		dispatch("change", event);
		const shouldCompleteModification = await onRequestConfirmation(requestedValue, value);
		if (shouldCompleteModification) {
			value = requestedValue;
		}
	};
</script>

<div
	class="editable-text"
	tabindex="0"
	use:clickOutside
	on:click={startEditing}
	on:clickoutside={stopEditing}
	on:keypress={(event) => event.key === "Enter" && startEditing()}
>
	{#if editing}
		<input
			type="text"
			on:change={onChangeComplete}
			on:input={onInput}
			bind:this={editionBox}
			bind:value={requestedValue}
			placeholder={freshStart ? value : ""}
		/>
	{:else}
		<p>{value}</p>
	{/if}
</div>

<style lang="scss">
</style>
