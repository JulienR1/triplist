<script lang="ts">
	import { createEventDispatcher } from "svelte";
	import { SvgSource } from "../svg/SvgSource";
	import SvgIcon from "../SvgIcon.svelte";
	import EditableText from "./EditableText.svelte";
	import EditableTextButton from "./EditableTextButton.svelte";
	import { EditableTextCallback } from "./EditableTextCallback";

	export let value: string;
	export let placeholder: string = undefined;
	export let disabled = false;
	export let isHeader = false;
	export let hideBorder = false;

	const dispatch = createEventDispatcher();
	const iconSize = 24;

	let editableTextID = {};
	let confirmButton: HTMLElement;
	let denyButton: HTMLElement;

	const onDataChange = () => requestAnimationFrame(() => dispatch("datachange"));

	const handleKeypress = ({ detail }: CustomEvent<KeyboardEvent>) => {
		const { key } = detail as KeyboardEvent;

		if (key === "Enter") {
			confirmButton.click();
		} else if (key === "Escape") {
			denyButton.click();
		}
	};
</script>

<div class="confirmed-editable-text">
	<EditableText
		{editableTextID}
		{placeholder}
		{disabled}
		{isHeader}
		{hideBorder}
		bind:value
		on:keydown={handleKeypress}
	>
		<div class="controls">
			<EditableTextButton {editableTextID} callback={EditableTextCallback.CONFIRM} on:click={onDataChange}>
				<span class="confirm" bind:this={confirmButton}>
					<SvgIcon src={SvgSource.CHECK} size={iconSize} color={"var(--dark-green)"} />
				</span>
			</EditableTextButton>
			<EditableTextButton {editableTextID} callback={EditableTextCallback.DENY}>
				<span class="deny" bind:this={denyButton}>
					<SvgIcon src={SvgSource.CANCEL} size={iconSize} color={"var(--dark-red)"} />
				</span>
			</EditableTextButton>
		</div>
	</EditableText>
</div>

<style lang="scss">
	.confirmed-editable-text {
		display: flex;
	}

	.controls {
		display: flex;
		align-items: center;
		padding: 2px;
		gap: 2px;

		span {
			display: block;
			aspect-ratio: 1;
			border-radius: 3px;

			&.confirm {
				background-color: var(--light-green);
			}

			&.deny {
				background-color: var(--light-red);
			}
		}
	}
</style>
