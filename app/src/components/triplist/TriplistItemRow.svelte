<script lang="ts">
	import type { Item } from "../../../../common/ITripList";
	import { SvgSource } from "../svg/SvgSource";
	import SvgIcon from "../SvgIcon.svelte";

	export let item: Item;
	export let parentId: string = "";

	$: itemDetails = item.values.map((value, index) => ({
		checked: value,
		id: `${parentId}${item.name}${index}`,
	}));

	const toggleCheckbox = (id: string) => {
		document.getElementById(id).click();
	};
</script>

<tr>
	<td>{item.name}</td>
	{#each itemDetails as { checked, id }}
		<td>
			<input type="checkbox" {id} {checked} />
			<label tabindex="0" for={id} on:keypress|preventDefault={() => toggleCheckbox(id)}>
				<div>
					<SvgIcon src={SvgSource.CHECK} size={14} color={"var(--dark-blue)"} />
				</div>
			</label>
		</td>
	{/each}
</tr>

<style lang="scss">
	label {
		--size: 12px;

		margin: 0;
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

		&:hover,
		&:focus,
		&:focus-within {
			box-shadow: 0 0 4px var(--dark-grey);
		}

		&:focus-visible {
			outline: none;
		}
	}

	input {
		width: 0;
		height: 0;
		opacity: 0;
		visibility: hidden;
		position: absolute;

		&:checked + label {
			border-color: var(--light-blue);
			background-color: var(--light-blue);

			div {
				visibility: visible;
			}

			&:hover,
			&:focus,
			&:focus-within {
				box-shadow: 0 0 4px var(--dark-blue);
			}
		}
	}
</style>
