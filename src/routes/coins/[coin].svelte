<script>
	// @ts-nocheck

	import TradingViewWidget from 'svelte-tradingview-widget';
	import { page } from '$app/stores';
	import Trader from '$lib/Trader.svelte';
	const { coin } = $page.params;

	let options = {
		symbol: `BINANCE:${coin}USDT`,
		allow_symbol_change: false,
		theme: 'dark',
		style: 1,
		interval: 15,
		hide_top_toolbar: true
	};
</script>

<div class="container">
	<div class="grid grid-cols-3">
		<div class="container">
			<h2>Trading View</h2>
			<!-- <TradingViewWidget {options} /> -->
		</div>
		<Trader {coin} />
	</div>
</div>
