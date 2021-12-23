<script lang="ts">
	import { api } from "src/api";
	import type { IActivity } from "@common/models/IActivity";
	import ConfirmedEditableText from "../editableText/ConfirmedEditableText.svelte";
	import { Toast } from "src/toast/Toast";

	export let activity: IActivity;

	const handleDataChange = async () => {
		const updatedActivity = await api.updateActivity(activity);

		if (updatedActivity && updatedActivity.id === activity.id && updatedActivity.label === activity.label) {
			Toast.info("Modification complétée avec succès");
		} else {
			activity = { ...updatedActivity };
			Toast.error("Une erreur est survenue au cours de la modification.");
		}
	};
</script>

<th>
	<ConfirmedEditableText bind:value={activity.label} on:datachange={handleDataChange} />
</th>

<style lang="scss"></style>
