<script lang="ts">
	import EditableText from "./EditableText.svelte";
	import EditableTextButton from "./EditableTextButton.svelte";
	import { EditableTextCallback } from "./EditableTextCallback";

	export let value: string;
	export let placeholder: string = undefined;

	let editableTextID = {};
	let confirmButton: HTMLElement;
	let denyButton: HTMLElement;

	const handleKeypress = ({ detail }: CustomEvent<KeyboardEvent>) => {
		const { key } = detail as KeyboardEvent;

		if (key === "Enter") {
			confirmButton.click();
		} else if (key === "Escape") {
			denyButton.click();
		}
	};
</script>

<!-- TODO -->

<EditableText {editableTextID} {placeholder} bind:value on:keydown={handleKeypress}>
	<EditableTextButton {editableTextID} callback={EditableTextCallback.CONFIRM}>
		<span bind:this={confirmButton}>Confirmer</span>
	</EditableTextButton>
	<EditableTextButton {editableTextID} callback={EditableTextCallback.DENY}>
		<span bind:this={denyButton}>Annuler</span>
	</EditableTextButton>
</EditableText>

<style lang="scss"></style>
