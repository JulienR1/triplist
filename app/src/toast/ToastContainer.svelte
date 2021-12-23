<script lang="ts">
	import { onDestroy, onMount } from "svelte";
	import { get, Unsubscriber } from "svelte/store";
	import { crossfade } from "svelte/transition";
	import { flip } from "svelte/animate";
	import { quintOut } from "svelte/easing";
	import type { IToast, ToastId } from "./IToast";
	import { toastStore } from "./ToastStore";
	import ToastItem from "./ToastItem.svelte";

	let unsubscribe: Unsubscriber;
	let timeouts = new Map<ToastId, NodeJS.Timeout>();

	onMount(() => {
		unsubscribe = toastStore.subscribe((allToasts) => {
			allToasts.forEach(onToastUpdate);
		});
	});

	onDestroy(() => {
		unsubscribe();
		timeouts.forEach((timeout) => {
			clearTimeout(timeout);
		});
	});

	const onToastUpdate = ({ id, timeToLive }: IToast) => {
		if (timeouts.get(id)) {
			return;
		}

		const timeout = setTimeout(() => {
			onToastOver(id);
		}, timeToLive);
		timeouts.set(id, timeout);
	};

	const onToastOver = (toastId: ToastId) => {
		const currentToasts = get(toastStore).filter(({ id }) => id !== toastId);
		toastStore.set(currentToasts);
		clearTimeout(timeouts.get(toastId));
		timeouts.delete(toastId);
	};

	const [send, receive] = crossfade({
		duration: (d) => Math.sqrt(d * 200),

		fallback(node, params) {
			const style = getComputedStyle(node);
			const transform = style.transform === "none" ? "" : style.transform;

			return {
				duration: 600,
				easing: quintOut,
				css: (t) => `
			transform: ${transform} scale(${t});
			opacity: ${t};
		`,
			};
		},
	});
</script>

<div class="toasts">
	{#each $toastStore as toast (toast.id)}
		<div class="animation-container" in:receive={{ key: toast.id }} out:send={{ key: toast.id }} animate:flip>
			<ToastItem {toast} on:remove={() => onToastOver(toast.id)} />
		</div>
	{/each}
</div>
<slot />

<style lang="scss">
	.toasts {
		$spacing: 12px;

		position: fixed;
		display: flex;
		padding: $spacing;
		width: fit-content;
		gap: $spacing;
		top: 0;
		left: 50%;
		flex-direction: column;
		transform: translateX(-50%);
	}

	.animation-container {
		width: fit-content;
		margin: 0 auto;
	}
</style>
