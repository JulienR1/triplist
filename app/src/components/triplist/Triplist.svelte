<script lang="ts">
	import { onMount } from "svelte";
	import { callTriplistApi, triplistData } from "./triplistStore";

	import Loader from "./../Loader.svelte";
	import TriplistBody from "./TriplistBody.svelte";
	import TriplistHeader from "./TriplistHeader.svelte";
	import UnknownError from "./../UnknownError.svelte";
	import type { IActivity } from "@common/models/IActivity";
	import type { ICategory } from "@common/models/ICategory";

	onMount(() => callTriplistApi());

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

			apiStoreData.categories.forEach((category) => {
				category.items.forEach((item) => {
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

			return storedData;
		});
	};
</script>

<section>
	{#if $triplistData.filteredData || $triplistData.apiData}
		<table id="triplist">
			<TriplistHeader
				disabled={$triplistData.filteredData !== undefined}
				activities={($triplistData.filteredData || $triplistData.apiData).activities}
				on:requestupdate={updateActivities}
			/>
			<TriplistBody
				disabled={$triplistData.filteredData !== undefined}
				categories={($triplistData.filteredData || $triplistData.apiData).categories}
				activityCount={($triplistData.filteredData || $triplistData.apiData).activities.length}
				on:requestupdate={updateCategories}
			/>
		</table>
	{:else if $triplistData.error}
		<UnknownError onRetry={callTriplistApi} />
	{:else}
		<Loader />
	{/if}
</section>
