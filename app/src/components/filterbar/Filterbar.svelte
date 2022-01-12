<script lang="ts">
	import { onMount } from "svelte";
	import { SvgSource } from "../svg/SvgSource";
	import { callFilterTriplistApi, triplistData } from "../triplist/triplistStore";
	import SearchInput from "../searchInput/SearchInput.svelte";
	import SvgIcon from "../SvgIcon.svelte";

	let renderFiltering = false;
	let availableOptions: string[] = [];
	let appliedFilters: string[] = [];

	onMount(() => {
		const unsubscribe = triplistData.subscribe(({ apiData }) => {
			if (apiData) {
				availableOptions = apiData.activities
					.map(({ label }) => {
						return appliedFilters.includes(label) ? undefined : label;
					})
					.filter((option) => option !== undefined);
			}
		});

		return () => {
			unsubscribe();
		};
	});

	const handleNewFilter = ({ detail: newFilter }: CustomEvent<string>) => {
		if (!appliedFilters.find((filter) => filter === newFilter)) {
			appliedFilters = [...appliedFilters, newFilter];
			callFilterTriplistApi(appliedFilters);
		}
	};

	const handleRemoveFilter = (filter: string) => {
		const filterIndex = appliedFilters.findIndex((appliedFilter) => appliedFilter === filter);
		if (filterIndex >= 0) {
			appliedFilters.splice(filterIndex, 1);
			appliedFilters = [...appliedFilters];
			callFilterTriplistApi(appliedFilters);
		}
	};

	const handleClear = () => {
		appliedFilters = [];
		callFilterTriplistApi(appliedFilters);
	};
</script>

<svelte:window on:click={() => (renderFiltering = false)} />

<section class="filter-bar">
	<div class="filter-icon">
		<SvgIcon src={SvgSource.FILTER} />
	</div>
	<div class="applied-filters">
		{#each appliedFilters as filter}
			<button on:click={() => handleRemoveFilter(filter)}>
				<span>{filter}</span>
				<div class="icon">
					<SvgIcon src={SvgSource.DELETE} size={14} />
				</div>
			</button>
		{/each}
	</div>
	<div class="search">
		{#if renderFiltering}
			<SearchInput placeholder="Élément recherché" options={availableOptions} on:select={handleNewFilter} />
		{:else}
			<button class="search-toggle" on:click|stopPropagation={() => (renderFiltering = true)}>
				<SvgIcon src={SvgSource.ADD} />
			</button>
		{/if}
	</div>
	{#if appliedFilters.length > 0}
		<div class="clear">
			<button class="clear-toggle" on:click|stopPropagation={handleClear}> Aucun filtre </button>
		</div>
	{/if}
</section>

<style lang="scss">
	.filter-bar {
		display: flex;

		button {
			display: block;
			background: none;
			border: none;
		}

		.filter-icon {
			display: flex;
			justify-content: center;
			align-items: center;
		}

		.applied-filters {
			display: flex;

			button {
				display: flex;
				width: fit-content;
				margin: 0 4px;
				border: 1px solid var(--darker-grey-white);
				border-radius: 2px;
				justify-content: flex-start;
				align-items: center;
				cursor: pointer;

				span {
					padding: 2px 4px;
				}

				.icon {
					display: block;
					max-width: 0;
					opacity: 0;
					transform: translateX(-14px);
					transition: all 0.35s ease;
				}

				&:hover,
				&:focus,
				&:focus-within {
					.icon {
						opacity: 1;
						max-width: 14px;
						transform: translateX(0);
					}
				}
			}
		}

		.search {
			display: flex;
			margin: 0 2px;
			z-index: 2;

			button {
				width: 100%;
				display: flex;
				border: 1px solid var(--darker-grey-white);
				border-radius: 2px;
				aspect-ratio: 1;
				cursor: pointer;
				transition: all 0.15s ease;
				justify-content: center;
				align-items: center;

				&:hover,
				&:focus,
				&:focus-within {
					box-shadow: 0 0 4px -1px var(--dark-grey);
				}
			}
		}

		.clear {
			background-color: var(--light-red);
			border-radius: 2px;

			button {
				font-weight: var(--semi-bold);
				font-size: 10px;
				text-transform: uppercase;
				color: var(--white);
				padding: 6px 12px;
				letter-spacing: 1px;
				cursor: pointer;
			}
		}
	}
</style>
