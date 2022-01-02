<script lang="ts">
	import { setContext, createEventDispatcher } from "svelte";
	import { clickOutside } from "./../../components/directives/clickOutside";

	export let value: string;
	export let editableTextID: {};
	export let placeholder = undefined;
	export let disabled = false;
	export let isHeader = false;
	export let hideBorder = false;

	const dispatch = createEventDispatcher();

	let editing = false;
	let modifiedValue;
	let inputbox: HTMLInputElement;

	$: modifiedValue = value;
	$: isDirty = editing && modifiedValue.trim() !== value;

	const onInputRender = (element: HTMLElement) => {
		element.focus();
	};

	const handleKeypress = (event: KeyboardEvent) => {
		const isEnter = event.key === "Enter";
		const isEscape = event.key === "Escape";

		if (isEnter && !editing) {
			startEditing();
		} else if ((isEnter || isEscape) && !isDirty) {
			applyChanges(false);
		} else {
			dispatch(event.type, event);
		}
	};

	const handleClickOut = () => {
		if (editing && !isDirty) {
			applyChanges(false);
		}
	};

	const startEditing = () => {
		if (disabled) {
			return;
		}
		if (!editing) {
			editing = true;
		}
	};

	const applyChanges = (shouldApplyChanges: boolean) => {
		inputbox?.blur();
		requestAnimationFrame(() => {
			editing = false;
			if (shouldApplyChanges) {
				value = modifiedValue;
			} else {
				modifiedValue = value;
			}
		});
	};

	setContext(editableTextID, { confirm: () => applyChanges(true), deny: () => applyChanges(false) });
</script>

<div
	class={["editable-text", hideBorder && "no-border"].join(" ")}
	tabindex="0"
	use:clickOutside
	on:click={startEditing}
	on:keydown|stopPropagation={handleKeypress}
	on:clickoutside={handleClickOut}
>
	{#if editing}
		<input
			type="text"
			use:onInputRender
			bind:value={modifiedValue}
			bind:this={inputbox}
			placeholder={placeholder || value}
		/>
	{:else}
		<p class={[!value && "placeholder", isHeader && "is-header"].join(" ")}>
			{value || placeholder}
		</p>
	{/if}
</div>

{#if isDirty}
	<slot />
{/if}

<style lang="scss">
	.editable-text {
		display: block;
		width: 100%;
		&:not(.no-border) {
			border: 1px solid var(--light-grey);
		}
		border-radius: 4px;
		margin: 1px;

		&:focus,
		&:focus-within {
			border: 2px solid var(--dark-grey);
			margin: 0;
		}

		input,
		p {
			$padding: 4px;

			width: calc(100% - 2 * #{$padding});
			padding: $padding;
			outline: none;
			border: none;
			font-size: 12px;
			text-transform: capitalize;

			&.is-header {
				font-weight: var(--bold);
				text-transform: uppercase;
			}
		}

		p.placeholder {
			opacity: 0.5;
		}

		input {
			margin: 1px 0;
		}
	}
</style>
