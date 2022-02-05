<script>
	// @ts-nocheck

	import TradingViewWidget from 'svelte-tradingview-widget';
	import { page } from '$app/stores';
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

<TradingViewWidget {options} />
