<script lang="ts">
	import type { Activity } from "../../../../common/ITripList";

	export let activities: Activity[];
</script>

<thead>
	<tr>
		<th />
		{#each activities as activity}
			<th>{activity}</th>
		{/each}
	</tr>
</thead>

<style lang="scss"></style>
