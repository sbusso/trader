<script>
	import { createEventDispatcher, onDestroy, onMount } from 'svelte';
	import { traderStore, priceStore, precisionStore } from '$stores/trader';
	// let data = {};
	// data =   {"lastUpdateId":5373619641,"bids":[["1.12600000","21246.40000000"],["1.12500000","153682.80000000"],["1.12400000","213919.30000000"],["1.12300000","123956.80000000"],["1.12200000","109769.40000000"],["1.12100000","86753.90000000"],["1.12000000","295738.70000000"],["1.11900000","253286.10000000"],["1.11800000","156344.40000000"],["1.11700000","63530.60000000"]],"asks":[["1.12700000","88657.70000000"],["1.12800000","181355.20000000"],["1.12900000","182237.00000000"],["1.13000000","176539.90000000"],["1.13100000","91490.00000000"],["1.13200000","37624.30000000"],["1.13300000","78810.80000000"],["1.13400000","124148.00000000"],["1.13500000","54429.50000000"],["1.13600000","110795.70000000"]]}

	let bids = undefined;
	let asks = undefined;
	let totalBids = 0;
	let totalAsks = 0;
	let avgBid = 0;
	let avgAsk = 0;
	let connOrderBook;
	let currentCoin;
	let connTrade;
	let lastTrade;
	let previousTrade;
	let direction = 0;

	// export let coin = '';
	let precision = 0;
	let traderOptions;
	const dispatchClickPrice = createEventDispatcher();

	function clickPrice(price) {
		console.log('clickPrice', price);
		priceStore.set(price);
	}

	function nFormat(num, size = 2) {
		return num.toFixed(size);
	}

	onMount(() => {
		precisionStore.subscribe((p) => {
			precision = p;
		});

		traderStore.subscribe((t) => {
			traderOptions = t;
			console.log('OrderBook:', traderOptions);

			if (currentCoin == undefined || currentCoin != traderOptions.coin) {
				// const script = document.createElement("script");
				// script.src = "https://cdn.jsdelivr.net/npm/@

				if (connOrderBook != undefined) {
					console.log('OrderBook Close Connection');
					connOrderBook.close();
				}

				if (connTrade != undefined) {
					console.log('Trade Close Connection');
					connTrade.close();
				}
				connOrderBook = new WebSocket(
					`wss://stream.binance.com:9443/ws/${traderOptions.coin.toLowerCase()}${traderOptions.base.toLowerCase()}@depth20@1000ms`
				);
				connTrade = new WebSocket(
					`wss://stream.binance.com:9443/ws/${traderOptions.coin.toLowerCase()}${traderOptions.base.toLowerCase()}@trade`
				);
				connOrderBook.onopen = function () {
					// 	connection.send('Hello Server!');
					console.log('OrderBook Connection Open');
				};

				connTrade.onopen = function () {
					// 	connection.send('Hello Server!');
					console.log('Trade Connection Open');
				};

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
					precisionStore.setPrecision(Number(bids[0][0]));
					totalBids = sumBids;
					totalAsks = sumAsks;
					avgBid = sumBids / bids.length;
					avgAsk = sumAsks / asks.length;
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
					previousTrade = lastTrade;
					lastTrade = Number(data.p);
					if (previousTrade !== undefined) {
						direction = lastTrade - previousTrade;
					}
				};
			}
		});
		// onDestroy(() => {
		// 	connection.close();
		// });
	});
</script>

<!-- bid -->
<div class="p-2">
	<div class="p-4 rounded-md w-80 bg-mirage ">
		<div class="text-slate-200 font-fira">
			{#if typeof asks !== 'undefined'}
				<table class="table">
					<thead class="text-xs font-ibm text-slate-400">
						<tr>
							<th class="pb-2 text-left">Price (USDT)</th>
							<th class="pb-2 text-right">Amount ({traderOptions.coin})</th>
							<th class="pb-2 text-right">Total</th>
						</tr>
					</thead>
					<tbody>
						{#each asks as ask}
							<tr
								on:click={() => clickPrice(ask[0])}
								class="text-xs cursor-pointer bg {ask[1] > 4 * avgAsk ? 'text-yellow-300' : ''}"
								style="background: linear-gradient(90deg, rgba(60, 130, 246, 0.0) {100 -
									(100 * ask[2]) / totalAsks}%,rgba(60, 130, 246, 0.2) {100 -
									(100 * ask[2]) / totalAsks}%);"
							>
								<td class="w-24 text-blue-500 ">{nFormat(ask[0], precision)}</td>
								<td class="w-24 text-right ">{nFormat(ask[1], 7 - precision)}</td>
								<td class="w-24 text-right ">{nFormat(ask[1] * ask[0], 0)}</td>
							</tr>
						{/each}
					</tbody>
				</table>
			{/if}
		</div>
		{#if typeof lastTrade !== 'undefined'}
			<div class="font-semibold text-slate-100 font-fira">
				<table class="table">
					<tbody>
						<tr class="cursor-pointer" on:click={() => clickPrice(lastTrade)}>
							{#if bids !== 'undefined'}
								<td class="w-36" colspan="3">
									<span class="transition-colors ease-in"> {nFormat(lastTrade, precision)}</span>
									{#if direction > 0}
										<span class="text-green-500"> &#9650; </span>
									{:else if direction < 0}
										<span class="text-red-500"> &#9660; </span>
									{:else}
										<span class="text-slate-500"> &#9679; </span>
									{/if}
								</td>
							{/if}
						</tr>
					</tbody>
				</table>
			</div>
		{/if}
		<div class="flex text-slate-200 font-fira">
			{#if typeof bids !== 'undefined'}
				<table class="table">
					<tbody>
						{#each bids as bid}
							<tr
								on:click={() => clickPrice(bid[0])}
								class="text-xs cursor-pointer bg {bid[1] > 4 * avgBid ? 'text-yellow-300' : ''}"
								style="background: linear-gradient(90deg, rgba(239, 68, 68, 0.0) {100 -
									(100 * bid[2]) / totalBids}%, rgba(239, 68, 68, 0.2) {100 -
									(100 * bid[2]) / totalBids}%);"
							>
								<td class="w-24 text-red-500">{nFormat(bid[0], precision)}</td>
								<td class="w-24 text-right ">{nFormat(bid[1], Math.max(3 - precision, 0))}</td>
								<td class="w-24 text-right ">{nFormat(bid[1] * bid[0], 0)}</td>
							</tr>
						{/each}
					</tbody>
				</table>
			{/if}
		</div>
	</div>
</div>
