<script>
	// const socket = new WebSocket("ws://localhost:8000/chat")
	// socket.addEventListener("open", ()=> {
	//     console.log("Opened")
	// })

	import { onMount } from 'svelte';

	import { derived } from 'svelte/store';
	import Percentage from '$lib/Percentage.svelte';
	import websocketStore from 'svelte-websocket-store';
	let tickerStore;
	let tickerDisplay = {
		price: '',
		change: '',
		changePercent: 0,
		high: '',
		low: '',
		volume: ''
	};
	let price = '0.00';

	function nFormat(n) {
		// return n.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,') + ' ' + currency;
		return Number(n).toFixed(2) || '0.00';
	}

	export let coin;
	onMount(() => {
		tickerStore = websocketStore(`wss://stream.binance.com:9443/ws/${coin}usdt@miniTicker`, {}, []);
		tickerStore.subscribe((ticker) => {
			if (ticker.c !== undefined) {
				let change = ticker.c - ticker.o;
				let changePercent = (change / ticker.o) * 100 || 0;
				tickerDisplay = {
					price: nFormat(ticker.c),
					change: nFormat(change),
					volume: ticker.v,
					changePercent: nFormat(changePercent),
					high: nFormat(ticker.h),
					low: nFormat(ticker.l)
				};
			}
		});
	});
	// $: displayPrice = price.toFixed(2);
	// $: if (price !== undefined) {
	// 	console.log(price.toFixed(2));
	// }

	// const displayPrice = derived(
	// 	tickerStore,
	// 	($tickerStore) => {
	// 		if ($tickerStore !== undefined) {
	// 			console.log($tickerStore.c.toFixed(2));
	// 			return $tickerStore.c.toFixed(2);
	// 		}
	// 	},
	// 	0
	// );
</script>

<div class="block p-6 max-w-xs bg-slate-800 rounded-md">
	<h5 class="mb-2 text-2xl font-bold tracking-tight text-white flex">
		<img src="/static/coins-icons/icons/{coin}.png" class="rounded-full w-8 mr-4" alt="" />
		{coin.toUpperCase()}
	</h5>

	<p class="font-bold text-slate-200 text-3xl font-fira">{tickerDisplay.price}</p>
	<p class=" text-slate-200 text-xl font-fira">
		{tickerDisplay.change} – <Percentage value={tickerDisplay.changePercent} />
	</p>
</div>
