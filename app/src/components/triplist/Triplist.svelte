<script lang="ts">
    import { onMount } from "svelte";
    import { api } from "./../../api/";
    import { ITriplistStore, triplistData } from "./triplistStore";

    import Loader from "./../Loader.svelte";
    import TriplistBody from "./TriplistBody.svelte";
    import TriplistHeader from "./TriplistHeader.svelte";
    import UnknownError from "./../UnknownError.svelte";
    import type { IActivity } from "@common/models/IActivity";

    let isLoading = false;
    onMount(() => callApi());

    const callApi = async () => {
        isLoading = true;
        let apiStoreData: ITriplistStore = { apiData: undefined, error: undefined };
        try {
            apiStoreData.apiData = await api.fetchTriplist();
        } catch (err) {
            apiStoreData.error = err;
        } finally {
            triplistData.set(apiStoreData);
            isLoading = false;
        }
    };

    const updateActivities = async ({ detail: activity }: CustomEvent<IActivity>) => {
        triplistData.update((storedData) => {
            const apiStoreData = storedData.apiData;

            let index = apiStoreData.activities.findIndex(({ id }) => id === activity.id);
            if (index >= 0) {
                apiStoreData.activities.splice(index, 1);
                Object.keys(apiStoreData.categories).forEach((key) => {
                    apiStoreData.categories[key].forEach((item) => {
                        item.values.splice(index, 1);
                    });
                });
            } else {
                apiStoreData.activities.push(activity);
                Object.keys(apiStoreData.categories).forEach((key) => {
                    apiStoreData.categories[key].forEach((item) => {
                        item.values.push(false);
                    });
                });
            }

            return storedData;
        });
    };
</script>

<section>
    {#if isLoading}
        <Loader />
    {:else if $triplistData.apiData}
        <table id="triplist">
            <TriplistHeader activities={$triplistData.apiData.activities} on:requestupdate={updateActivities} />
            <TriplistBody categories={$triplistData.apiData.categories} />
        </table>
    {:else if $triplistData.error}
        <UnknownError onRetry={callApi} />
    {/if}
</section>
