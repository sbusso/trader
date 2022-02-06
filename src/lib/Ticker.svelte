<script>
	// const socket = new WebSocket("ws://localhost:8000/chat")
	// socket.addEventListener("open", ()=> {
	//     console.log("Opened")
	// })

	import { onDestroy, onMount } from 'svelte';

	import { derived } from 'svelte/store';
	import Percentage from '$lib/Percentage.svelte';
	import websocketStore from 'svelte-websocket-store';
	let tickerStore;
	let tickerDisplay = {
		c: 0,
		price: '',
		change: '',
		changePercent: 0,
		high: '',
		low: '',
		volume: '',
		direction: 0
	};
	let price = '0.00';

	function nFormat(n) {
		// return n.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,') + ' ' + currency;
		return Number(n).toFixed(2) || '0.00';
	}

	function fadeColor(node, { direction = 1, delay = 0, duration = 500 }) {
		let color = 'green';
		if (direction < 0) {
			color = 'red';
		}
		// setTimeout(() => {
		// 	node.style.color = 'text-slate-200';
		// }, duration);

		return {
			delay,
			duration,
			css: (t, d) => {
				return `color: ${t < d / 2 ? color : 'white'};`;
			}
		};
	}

	export let coin;
	onMount(() => {
		tickerStore = websocketStore(`wss://stream.binance.com:9443/ws/${coin}usdt@miniTicker`, {}, []);
		const unsubscribe = tickerStore.subscribe((ticker) => {
			if (ticker.c !== undefined) {
				let change = ticker.c - ticker.o;
				let changePercent = (change / ticker.o) * 100 || 0;
				let direction = ticker.c - tickerDisplay.c;
				tickerDisplay = {
					c: ticker.c,
					price: nFormat(ticker.c),
					change: nFormat(change),
					volume: ticker.v,
					changePercent: changePercent,
					high: nFormat(ticker.h),
					low: nFormat(ticker.l),
					direction: direction
				};
			}
		});

		onDestroy(unsubscribe);
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

	<p
		style="transition:color 1s ease-out"
		class="font-bold text-3xl  font-fira"
		in:fadeColor={{ direction: tickerDisplay.direction }}
	>
		{tickerDisplay.price}
	</p>
	<p class=" text-slate-200 text-xl font-fira ">
		<Percentage value={tickerDisplay.changePercent} /> ({tickerDisplay.change})
	</p>
</div>
