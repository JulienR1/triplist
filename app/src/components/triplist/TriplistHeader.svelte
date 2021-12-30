<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import type { IActivity } from "@common/models/IActivity";
    import ConfirmedEditableText from "../editableText/ConfirmedEditableText.svelte";
    import { stringIsValid } from "common/dist/utils/baseValidators";
    import TriplistActivity from "./TriplistActivity.svelte";
    import { api } from "../../api";
    import { Toast } from "../../toast/Toast";

    export let activities: IActivity[];
    export let disabled = false;
    let newActivityName: string = "";

    const dispatch = createEventDispatcher();

    const handleNewActivity = async () => {
        const storedActivityName = newActivityName;
        newActivityName = "";

        if (stringIsValid(storedActivityName)) {
            const receivedActivityData = await api.createActivity({ id: -1, label: storedActivityName });
            if (storedActivityName === receivedActivityData?.label) {
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
        {#each activities as activity (activity.id)}
            <TriplistActivity {activity} {disabled} on:requestupdate />
        {/each}
        {#if !disabled}
            <th>
                <ConfirmedEditableText bind:value={newActivityName} placeholder="Nouvelle activité" on:datachange={handleNewActivity} />
            </th>
        {/if}
    </tr>
</thead>

<style lang="scss">
</style>
