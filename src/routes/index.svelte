<script context="module">
	/** @type {import('@sveltejs/kit').Load} */
	export async function load({ params, fetch, session, stuff }) {
		const response = await fetch(
			'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&sparkline=true&price_change_percentage=1h,24h,7d,30d'
		);

		const coins = await response.json();
		console.log(coins);
		return {
			status: response.status,
			props: {
				coins: response.ok && coins
			}
		};
	}
</script>

<script>
	import Prct from '$lib/Percentage.svelte';
	import Sparkline from '$lib/Sparkline.svelte';
	import Signal from '$lib/Signal.svelte';
	import Range from '$lib/Range.svelte';
	import Ticker from '$lib/Ticker.svelte';
	export let coins = [];

	function nFormatter(num) {
		return Math.abs(num) > 999_999
			? (Math.sign(num) * (Math.abs(num) / 1_000_000).toFixed(0))
					.toLocaleString('en')
					.replace(/,/g, ' ') + 'M'
			: Math.sign(num) * Math.abs(num);
	}
</script>

<svelte:head>
	<script type="text/javascript" src="https://s3.tradingview.com/tv.js"></script>
</svelte:head>
<div class="grid m-8 grid-cols-5 gap-4">
	<Ticker coin="btc" />
	<Ticker coin="eth" />
	<Ticker coin="ada" />
	<Ticker coin="sol" />
	<Ticker coin="aca" />
</div>
<table class="min-w-full divide-y divide-gray-500 m-8">
	<thead class="text-sky-400">
		<th>Coin</th>
		<th />

		<th>$ Price </th>
		<th> Low </th>
		<th> High </th>
		<th />
		<th>1h</th>
		<th>24h</th>
		<th>7d</th>
		<th>30d</th>
		<th>Cap.</th>
		<th />
		<th colspan="3">Signals</th>
	</thead>
	<tbody class="divide-y divide-gray-700">
		{#each coins as coin, i}
			{#if coin.current_price != 1}
				<tr class="mb-4">
					<td class="w-12 px-2 py-3 whitespace-nowrap"
						><img src={coin.image} class="w-6 h-6 saturate-50" alt="" /></td
					>
					<td class=" px-2 py-3 whitespace-nowrap"
						><a href="/coins/{coin.symbol}">{coin.symbol.toUpperCase()}</a> –

						<a
							href="https://app.intotheblock.com/coin/{coin.symbol.toUpperCase()}"
							class="text-xs"
							target="_blank">info</a
						>
						<br />
						<span class="text-slate-300 text-sm">{coin.name}</span>
					</td>

					<td class="w-20 px-2 py-3 whitespace-nowrap text-right font-fira">{coin.current_price}</td
					>
					<td class="w-20 px-2 py-3 whitespace-nowrap text-right font-fira">{coin.low_24h}</td>
					<td class="w-20 px-2 py-3 whitespace-nowrap text-right font-fira">{coin.high_24h}</td>

					<td class="w-20 px-2 py-3 whitespace-nowrap text-right">
						<Range
							current={coin.current_price}
							low={coin.low_24h}
							high={coin.high_24h}
							poc={(coin.high_24h + coin.low_24h) / 2}
						/>
					</td>
					<td class="w-12 px-2 py-3 whitespace-nowrap text-right font-fira"
						><Prct value={Number(coin.price_change_percentage_1h_in_currency)} /></td
					>
					<td class="w-12 px-2 py-3 whitespace-nowrap text-right font-fira"
						><Prct value={Number(coin.price_change_percentage_24h_in_currency)} /></td
					>
					<td class="w-12 px-2 py-3 whitespace-nowrap text-right font-fira"
						><Prct value={Number(coin.price_change_percentage_7d_in_currency)} /></td
					>
					<td class="w-12 px-2 py-3 whitespace-nowrap text-right font-fira"
						><Prct value={Number(coin.price_change_percentage_30d_in_currency)} /></td
					>
					<td class="px-2 py-3 whitespace-nowrap text-right font-fira"
						>{nFormatter(coin.market_cap)}</td
					>
					<td class="w-36 px-2 py-3 whitespace-nowrap ">
						<Sparkline data={coin.sparkline_in_7d.price} /></td
					>
					<td class="px-1 py-3 whitespace-nowrap ">
						<Signal signal={coin.price_change_percentage_1h_in_currency} />
					</td>

					<td class="px-1 py-3 whitespace-nowrap ">
						<Signal signal={coin.price_change_percentage_24h_in_currency} />
					</td>

					<td class="px-1 py-3 whitespace-nowrap ">
						<Signal signal={coin.price_change_percentage_7d_in_currency} />
					</td>
				</tr>
			{/if}
			<!-- content here -->
		{/each}
	</tbody>
</table>
