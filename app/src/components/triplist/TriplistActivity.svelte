<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import { api } from "./../../api";
    import { Toast } from "../../toast/Toast";
    import type { IActivity } from "@common/models/IActivity";
    import ConfirmedEditableText from "../editableText/ConfirmedEditableText.svelte";
    import { activitiesAreEqual, activityIsValid } from "common/dist/utils/activityUtils";
    import DeleteWrapper from "../DeleteWrapper/DeleteWrapper.svelte";

    export let activity: IActivity;

    const dispatch = createEventDispatcher();

    const handleDataChange = async () => {
        const updatedActivity = await api.updateActivity(activity);

        if (activitiesAreEqual(updatedActivity, activity)) {
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
