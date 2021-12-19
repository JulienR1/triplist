<script lang="ts">
	import EditableText from "./EditableText.svelte";
	import type { ValidationEventProps, ValidationFct } from "./IEditableTextbox";

	export let value: string;
	export let freshStart = false;
	export let onConfirmChange: (newValue: string) => void = () => {};

	let requestedValue: string;
	let confirmFct: ValidationFct;
	let denyFct: ValidationFct;

	const onDataChange = ({ detail }) => {
		if (detail) {
			requestedValue = detail;
		}
	};

	const onChangeComplete = ({ confirm, deny }: ValidationEventProps) => {
		confirmFct = confirm;
		denyFct = deny;
	};

	const completeDecision = (decision: ValidationFct) => {
		if (decision) {
			decision();

			if (decision === confirmFct) {
				value = requestedValue;
			}
			onConfirmChange?.(value);

			requestedValue = undefined;
			confirmFct = undefined;
			denyFct = undefined;
		}
	};

	const onKeyPress = (event: KeyboardEvent) => {
		if (event.key === "Enter") {
			completeDecision(confirmFct);
		} else if (event.key === "Escape") {
			completeDecision(denyFct);
		}
	};

	$: isDirty = requestedValue && requestedValue !== value;
</script>

<div on:keydown={onKeyPress}>
	<EditableText {value} {freshStart} {onChangeComplete} on:datachange={onDataChange} />
	{#if isDirty}
		<button on:click={() => completeDecision(confirmFct)}>Confirm</button>
		<button on:click={() => completeDecision(denyFct)}>Deny</button>
	{/if}
</div>

<style lang="scss"></style>
