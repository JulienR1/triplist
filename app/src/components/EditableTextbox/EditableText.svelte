<script lang="ts">
	import { createEventDispatcher } from "svelte";
	import { clickOutside } from "./../directives/clickOutside";
	import type { ValidationEvent } from "./IEditableTextbox";

	export let value: string;
	export let freshStart: boolean = false;
	export let onChangeComplete: ValidationEvent;

	const dispatch = createEventDispatcher();

	let editing = false;
	let requestedValue: string;
	let editionBox: HTMLElement;

	$: isDirty = requestedValue && requestedValue !== value;

	const startEditing = () => {
		if (editing) {
			return;
		}

		editing = true;
		requestedValue = !freshStart ? value : "";
		requestAnimationFrame(() => editionBox.focus());
	};

	const stopEditing = () => {
		editionBox?.blur();
		requestAnimationFrame(() => (editing = false));
	};

	const confirm = () => {
		value = requestedValue;
		stopEditing();
	};

	const deny = () => {
		requestedValue = "";
		stopEditing();
	};

	const onChange = (event) => {
		if (!isDirty) {
			stopEditing();
			return;
		}

		dispatch("change", event);
		onChangeComplete({ confirm, deny });
	};

	const onInput = () => {
		requestAnimationFrame(() => dispatch("datachange", requestedValue));
		onChangeComplete({ confirm, deny });
	};
</script>

<div
	class="editable-text"
	tabindex="0"
	use:clickOutside
	on:click={startEditing}
	on:clickoutside={onChange}
	on:keypress={(event) => {
		if (!editing) {
			event.stopPropagation();
			event.key === "Enter" && startEditing();
		}
	}}
>
	{#if editing}
		<input
			type="text"
			on:input={onInput}
			on:change={onChange}
			bind:this={editionBox}
			bind:value={requestedValue}
			placeholder={freshStart ? value : ""}
		/>
	{:else}
		<p>{value}</p>
	{/if}
</div>

<style lang="scss">
	.editable-text {
		display: block;
		width: 100%;
		border: 1px solid var(--light-grey);
		border-radius: 4px;
		padding: 4px;
		margin: 1px;

		&:focus,
		&:focus-within {
			border: 2px solid var(--dark-grey);
			margin: 0;
		}

		input {
			outline: none;
			border: none;
			width: 100%;
		}
	}
</style>
