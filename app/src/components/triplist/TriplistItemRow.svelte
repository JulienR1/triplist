<script lang="ts">
	import { createEventDispatcher } from "svelte";
	import type { IItem } from "@common/models/IItem";
	import ConfirmedEditableText from "../editableText/ConfirmedEditableText.svelte";
	import { SvgSource } from "../svg/SvgSource";
	import SvgIcon from "../SvgIcon.svelte";
	import { itemIsValid, itemsAreEqual } from "common/dist/utils/itemUtils";
	import { arraysAreEqual } from "common/dist/utils/utils";
	import DeleteWrapper from "../DeleteWrapper/DeleteWrapper.svelte";
	import { Toast } from "../../toast/Toast";
	import { api } from "./../../api";

	export let item: IItem;
	export let disabled = false;

	const dispatch = createEventDispatcher();

	const onKeyPress = (event: KeyboardEvent) => {
		if (event.key === "Enter") {
			(event.target as HTMLElement).click();
		}
	};

	const handleItemChange = async () => {
		if (itemIsValid(item)) {
			const updatedItem = await api.updateItem(item);
			if (itemsAreEqual(item, updatedItem)) {
				Toast.info("Modification complétée avec succès.");
			} else {
				if (itemIsValid(updatedItem)) {
					item = { ...updatedItem };
				}
				Toast.error("Une erreur est survenue au cours de la modification.");
			}
		}
	};

	const handleToggle = async (event: Event) => {
		if (disabled) {
			Toast.info("Les modifications sont désactivées lorsqu'un filtre est actif.");
			return;
		}

		if (itemIsValid(item)) {
			const savedChecks = await api.checkItem(item);
			if (!arraysAreEqual(savedChecks, item.values)) {
				if (savedChecks) {
					item.values = savedChecks;
				} else {
					Toast.error("Erreur, la saisie n'a pas été prise en compte.");
				}
			}
		}
	};

	const handleDelete = async () => {
		await api.deleteItem(item);
		Toast.info("Item supprimé avec succès.");
		dispatch("delete", item);
	};
</script>

<tr>
	<td>
		<DeleteWrapper toRight {disabled} on:click={handleDelete}>
			<ConfirmedEditableText {disabled} hideBorder bind:value={item.label} on:datachange={handleItemChange} />
		</DeleteWrapper>
	</td>
	{#each item.values as checked}
		<td>
			<label class:disabled class:checked tabindex="0" on:keypress|preventDefault={(event) => onKeyPress(event)}>
				<input type="checkbox" {disabled} bind:checked on:change={handleToggle} />
				<div>
					<SvgIcon src={SvgSource.CHECK} size={14} color={"var(--dark-blue)"} />
				</div>
			</label>
		</td>
	{/each}
</tr>

<style lang="scss">
	tr {
		transition: background-color 0.3s ease;

		&:hover,
		&:focus,
		&:focus-within {
			background-color: var(--grey-white);
		}
	}

	td:first-of-type {
		transform: translateX(12px);
	}

	label {
		--size: 12px;

		margin: 0 auto;
		padding: 0;
		display: flex;
		justify-content: center;
		align-items: center;
		width: var(--size);
		height: var(--size);
		line-height: var(--size);
		border: 2px solid var(--dark-grey);
		border-radius: 4px;
		cursor: pointer;

		transition: 0.15s ease;

		div {
			visibility: hidden;
		}

		&.disabled {
			opacity: 0.75;
			filter: saturate(0.25);
			cursor: default;
		}

		&:not(.disabled) {
			&:hover,
			&:focus,
			&:focus-within {
				box-shadow: 0 0 4px var(--dark-grey);
			}
		}

		&:focus-visible {
			outline: none;
		}

		&.checked {
			border-color: var(--light-blue);
			background-color: var(--light-blue);

			div {
				visibility: visible;
			}

			&:not(.disabled) {
				&:hover,
				&:focus,
				&:focus-within {
					box-shadow: 0 0 4px var(--dark-blue);
				}
			}
		}
	}

	input {
		width: 0;
		height: 0;
		opacity: 0;
		visibility: hidden;
		position: absolute;
	}
</style>
