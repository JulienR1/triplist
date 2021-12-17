<script lang="ts">
	import { onMount } from "svelte";
	import { api } from "./../../api/";
	import { ITriplistStore, triplistData } from "./triplistStore";

	import Loader from "./../Loader.svelte";
	import TriplistBody from "./TriplistBody.svelte";
	import TriplistHeader from "./TriplistHeader.svelte";
	import UnknownError from "./../UnknownError.svelte";

	let isLoading = false;
	onMount(() => callApi());

	const callApi = async () => {
		isLoading = true;
		let apiStoreData: ITriplistStore = { apiData: undefined, error: undefined };
		try {
			// await new Promise((res, rej) => setTimeout(() => rej("err"), 1000));
			// await new Promise((res, rej) => setTimeout(res, 1000));

			apiStoreData.apiData = await api.fetchTriplist();
		} catch (err) {
			apiStoreData.error = err;
		} finally {
			triplistData.set(apiStoreData);
			isLoading = false;
		}
	};
</script>

<section>
	{#if isLoading}
		<Loader />
	{:else if $triplistData.apiData}
		<table id="triplist">
			<TriplistHeader activities={$triplistData.apiData.activities} />
			<TriplistBody categories={$triplistData.apiData.categories} />
		</table>
	{:else if $triplistData.error}
		<UnknownError onRetry={callApi} />
	{/if}
</section>
