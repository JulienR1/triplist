<script lang="ts">
    import { onMount } from "svelte";
    import { api } from "./../../api/";
    import { ITriplistStore, triplistData } from "./triplistStore";

    import Loader from "./../Loader.svelte";
    import TriplistBody from "./TriplistBody.svelte";
    import TriplistHeader from "./TriplistHeader.svelte";
    import UnknownError from "./../UnknownError.svelte";
    import type { IActivity } from "@common/models/IActivity";
    import type { ICategory } from "@common/models/ICategory";

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

            const index = apiStoreData.activities.findIndex(({ id }) => id === activity.id);
            const isAddingNewItem = index === -1;

            if (isAddingNewItem) {
                apiStoreData.activities.push(activity);
            } else {
                apiStoreData.activities.splice(index, 1);
            }

            Object.keys(apiStoreData.categories).forEach((key) => {
                apiStoreData.categories[key].forEach((item) => {
                    if (isAddingNewItem) {
                        item.values.push(false);
                    } else {
                        item.values.splice(index, 1);
                    }
                });
            });

            return storedData;
        });
    };

    const updateCategories = async ({ detail: category }: CustomEvent<ICategory>) => {
        triplistData.update((storedData) => {
            const apiStoreData = storedData.apiData;

            const index = apiStoreData.categories.findIndex(({ id }) => id === category.id);
            const isAddingNewItem = index === -1;

            if (isAddingNewItem) {
                apiStoreData.categories.push(category);
            } else {
                apiStoreData.categories.splice(index, 1);
            }

            // TODO: complete fct

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
            <TriplistBody categories={$triplistData.apiData.categories} on:requestupdate={updateCategories} />
        </table>
    {:else if $triplistData.error}
        <UnknownError onRetry={callApi} />
    {/if}
</section>
