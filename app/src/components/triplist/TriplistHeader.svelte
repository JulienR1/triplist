<script lang="ts">
	import { createEventDispatcher } from "svelte";
	import type { IActivity } from "@common/models/IActivity";
	import ConfirmedEditableText from "../editableText/ConfirmedEditableText.svelte";
	import { stringIsValid } from "common/dist/utils/baseValidators";
	import TriplistActivity from "./TriplistActivity.svelte";
	import { createActivity } from "src/api/api";
	import { Toast } from "src/toast/Toast";

	export let activities: IActivity[];

	const dispatch = createEventDispatcher();

	let isCreatingNewActivity = false;
	let newActivityName: string = "";

	const handleClick = () => {
		isCreatingNewActivity = true;
	};

	const handleNewActivity = async () => {
		const storedActivityName = newActivityName;
		isCreatingNewActivity = false;
		newActivityName = "";

		if (stringIsValid(storedActivityName)) {
			const receivedActivityData = await createActivity({ id: -1, label: storedActivityName });
			if (storedActivityName === receivedActivityData.label) {
				Toast.info("Ajout complété avec succès.");
				dispatch("requestupdate", receivedActivityData);
				return;
			}
		}
		Toast.error("Une erreur est survenue au moment de l'ajout.");
	};
</script>

<thead>
	<tr>
		<th />
		{#each activities as activity}
			<TriplistActivity {activity} on:requestupdate />
		{/each}
		<th class="add-button">
			{#if !isCreatingNewActivity}
				<button on:click={handleClick}>+</button>
			{:else}
				<ConfirmedEditableText
					bind:value={newActivityName}
					placeholder="Nouvelle activité"
					on:datachange={handleNewActivity}
				/>
			{/if}
		</th>
	</tr>
</thead>

<style lang="scss">
	.add-button {
		// visibility: hidden;
	}

	thead,
	tr {
		&:focus,
		&:focus-within,
		&:hover {
			& .add-button {
				visibility: visible;
			}
		}
	}
</style>
