<script>
	import { createEventDispatcher, onDestroy, onMount } from 'svelte';

	// let data = {};
	// data =   {"lastUpdateId":5373619641,"bids":[["1.12600000","21246.40000000"],["1.12500000","153682.80000000"],["1.12400000","213919.30000000"],["1.12300000","123956.80000000"],["1.12200000","109769.40000000"],["1.12100000","86753.90000000"],["1.12000000","295738.70000000"],["1.11900000","253286.10000000"],["1.11800000","156344.40000000"],["1.11700000","63530.60000000"]],"asks":[["1.12700000","88657.70000000"],["1.12800000","181355.20000000"],["1.12900000","182237.00000000"],["1.13000000","176539.90000000"],["1.13100000","91490.00000000"],["1.13200000","37624.30000000"],["1.13300000","78810.80000000"],["1.13400000","124148.00000000"],["1.13500000","54429.50000000"],["1.13600000","110795.70000000"]]}

	let bids = [];
	let asks = [];
	let totalBids = 0;
	let totalAsks = 0;
	let connOrderBook;
	let connTrade;
	let lastTrade;
	export let coin = '';
	let precision = 2;
	const dispatchClickPrice = createEventDispatcher();

	function clickPrice(price) {
		dispatchClickPrice('message', {
			price: price
		});
		alert(price);
	}

	function nFormat(num, size = 2) {
		return num.toFixed(size);
	}

	onMount(() => {
		// const script = document.createElement("script");
		// script.src = "https://cdn.jsdelivr.net/npm/@
		connOrderBook = new WebSocket(`wss://stream.binance.com:9443/ws/${coin}usdt@depth20@1000ms`);
		connTrade = new WebSocket(`wss://stream.binance.com:9443/ws/${coin}usdt@trade`);
		// connection.onopen = function () {
		// 	connection.send('Hello Server!');
		// };
		// connection.onerror = function (error) {
		// 	console.log('WebSocket Error ', error);
		// };
		connOrderBook.onmessage = function (e) {
			// console.log('Server: ', e.data);
			let data = JSON.parse(e.data);
			let sumBids = 0;
			let sumAsks = 0;
			let s1 = 0;
			bids = data.bids.map((bid) => {
				s1 = Number(bid[1]);
				return [Number(bid[0]), s1, (sumBids += s1)];
			});

			asks = data.asks
				.map((ask) => {
					s1 = Number(ask[1]);
					return [Number(ask[0]), s1, (sumAsks += s1)];
				})
				.reverse();
			totalBids = sumBids;
			totalAsks = sumAsks;
		};

		connTrade.onmessage = function (e) {
			//    {
			//     "e": "trade",     // Event type
			//     "E": 123456789,   // Event time
			//     "s": "BNBBTC",    // Symbol
			//     "t": 12345,       // Trade ID
			//     "p": "0.001",     // Price
			//     "q": "100",       // Quantity
			//     "b": 88,          // Buyer order ID
			//     "a": 50,          // Seller order ID
			//     "T": 123456785,   // Trade time
			//     "m": true,        // Is the buyer the market maker?
			//     "M": true         // Ignore
			//     }
			let data = JSON.parse(e.data);
			lastTrade = Number(data.p);
		};

		// onDestroy(() => {
		// 	connection.close();
		// });
	});
</script>

<!-- bid -->
<div class="p-20  w-full">
	<div class="container w-80 bg-neutral-900 rounded-md p-5 ">
		<div class="text-slate-200 font-fira">
			{#if typeof asks !== 'undefined'}
				<table class="table">
					<thead class="font-ibm text-sm text-slate-400">
						<tr>
							<th class="text-left pb-1">Price (USDT)</th>
							<th class="text-right pb-1">Amount ({coin.toUpperCase()})</th>
							<th class="text-right pb-1">Total</th>
						</tr>
					</thead>
					<tbody>
						{#each asks as ask}
							<tr
								on:click={() => clickPrice(ask[0])}
								class="bg text-xs cursor-pointer"
								style="background: linear-gradient(90deg, rgba(60, 130, 246, 0.0) {100 -
									(100 * ask[2]) / totalAsks}%,rgba(60, 130, 246, 0.2) {100 -
									(100 * ask[2]) / totalAsks}%);"
							>
								<td class="text-blue-500  w-24">{nFormat(ask[0], precision)}</td>
								<td class=" text-right w-24">{nFormat(ask[1], 0)}</td>
								<td class=" text-right w-24">{nFormat(ask[1] * ask[0], 0)}</td>
							</tr>
						{/each}
					</tbody>
				</table>
			{/if}
		</div>
		{#if typeof lastTrade !== 'undefined'}
			<div class="text-slate-100 font-fira font-semibold">
				<table class="table">
					<tbody>
						<tr class="cursor-pointer" on:click={() => clickPrice(lastTrade)}>
							{#if bids.length > 0}
								<td class="w-24 " colspan="3">
									{nFormat(lastTrade, precision)}
								</td>
							{/if}
						</tr>
					</tbody>
				</table>
			</div>
		{/if}
		<div class="text-slate-200 font-fira flex">
			{#if typeof bids !== 'undefined'}
				<table class="table">
					<tbody>
						{#each bids as bid}
							<tr
								on:click={() => clickPrice(bid[0])}
								class="bg text-xs cursor-pointer"
								style="background: linear-gradient(90deg, rgba(239, 68, 68, 0.0) {100 -
									(100 * bid[2]) / totalBids}%, rgba(239, 68, 68, 0.2) {100 -
									(100 * bid[2]) / totalBids}%);"
							>
								<td class="text-red-500 w-24">{nFormat(bid[0], precision)}</td>
								<td class=" text-right w-24">{nFormat(bid[1], 0)}</td>
								<td class=" text-right w-24">{nFormat(bid[1] * bid[2], 0)}</td>
							</tr>
						{/each}
					</tbody>
				</table>
			{/if}
		</div>
	</div>
</div>

<style lang="scss">
	.page {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100%;
		font-size: 16px;

		width: 500px;
	}
	.orderbook {
		padding: 15px;
		border-radius: 0.5rem;
	}

	.bg {
		background-color: #1b1d23;
		transition: 0.2s;
	}
</style>
