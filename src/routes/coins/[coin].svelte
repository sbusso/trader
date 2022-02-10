<script>
	// @ts-nocheck

	import { page } from '$app/stores';
	import OrderBook from '$lib/OrderBook.svelte';
	import Trader from '$lib/Trader.svelte';
	import Chart from '$lib/Chart.svelte';
	import { traderStore } from '$lib/stores/trader';
	import { onMount } from 'svelte';
	const { coin } = $page.params;

	onMount(() => {
		traderStore.set({
			coin: coin.toUpperCase(),
			base: 'USDT',
			exchange: 'BINANCE',
			precision: 2,
			interval: '15',
			depth: 20,
			increment: 0.01
		});
	});
</script>

<div class="container">
	<div class="flex flex-row">
		<!-- <Chart class="basis-1/2" /> -->
		<OrderBook class="basis-1/4" />
		<Trader class="basis-1/4" />
	</div>
</div>
