<script lang="ts">
	import type { IActivity } from "@common/models/IActivity";
	import TriplistActivity from "./TriplistActivity.svelte";

	export let activities: IActivity[];
</script>

<thead>
	<tr>
		<th />
		{#each activities as activity}
			<TriplistActivity {activity} />
		{/each}
	</tr>
</thead>

<style lang="scss"></style>
