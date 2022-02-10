<script>
	import TradingViewWidget from 'svelte-tradingview-widget';
	import { traderStore } from '$stores/trader';

	let traderOptions;
	let chartOptions;

	traderStore.subscribe((t) => {
		traderOptions = t;
		chartOptions = {
			symbol: `${traderOptions.exchange}:${traderOptions.coin}${traderOptions.base}`,
			allow_symbol_change: false,
			theme: 'dark',
			style: 1,
			interval: traderOptions.interval,
			hide_top_toolbar: false
		};
		console.log(chartOptions);
	});
</script>

{#if chartOptions !== undefined}
	<div class="p-2">
		<TradingViewWidget {chartOptions} />
	</div>
{/if}
