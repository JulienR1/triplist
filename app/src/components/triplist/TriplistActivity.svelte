<script lang="ts">
	import { createEventDispatcher } from "svelte";
	import { api } from "src/api";
	import { Toast } from "src/toast/Toast";
	import type { IActivity } from "@common/models/IActivity";
	import ConfirmedEditableText from "../editableText/ConfirmedEditableText.svelte";
	import { activityIsValid } from "common/dist/utils/activityUtils";
	import DeleteWrapper from "../DeleteWrapper/DeleteWrapper.svelte";

	export let activity: IActivity;

	const dispatch = createEventDispatcher();

	const handleDataChange = async () => {
		const updatedActivity = await api.updateActivity(activity);

		if (updatedActivity && updatedActivity.id === activity.id && updatedActivity.label === activity.label) {
			Toast.info("Modification complétée avec succès");
		} else {
			if (activityIsValid(updatedActivity)) {
				activity = { ...updatedActivity };
			}
			Toast.error("Une erreur est survenue au cours de la modification.");
		}
	};

	const handleDelete = async () => {
		await api.deleteActivity(activity);
		Toast.info("Activité supprimée.");
		dispatch("requestupdate", activity);
	};
</script>

<th>
	<DeleteWrapper on:click={handleDelete}>
		<ConfirmedEditableText bind:value={activity.label} on:datachange={handleDataChange} />
	</DeleteWrapper>
</th>

<style lang="scss"></style>
