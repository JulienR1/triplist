<script lang="ts">
	import { api } from "src/api";
	import type { IActivity } from "@common/models/IActivity";
	import ConfirmedEditableText from "../editableText/ConfirmedEditableText.svelte";

	export let activity: IActivity;

	const handleDataChange = async () => {
		const updatedActivity = await api.updateActivity(activity);

		if (updatedActivity && updatedActivity.id === activity.id && updatedActivity.label === activity.label) {
			console.log("TODO: activity success toast!");
		} else {
			activity = { ...updatedActivity };
			console.log("TODO: activity failed toast!");
		}
	};
</script>

<th>
	<ConfirmedEditableText bind:value={activity.label} on:datachange={handleDataChange} />
</th>

<style lang="scss"></style>
