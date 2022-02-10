<script>
	import { traderStore, priceStore, precisionStore } from '$stores/trader';
	import { onMount } from 'svelte';
	let traderOptions;
	let baseQuantity;
	let coinQuantity;
	let total;
	let roundedUp = false;
	let precision = 2;

	let strategyStore = {
		targetProfitPercent: 0.03,
		stopLossPercent: 0.01,
		trailingStopPercent: 0.01,
		trailingTargetPercent: 0.01,
		basketAmount: 5000,
		riskRewardRatio: 3,
		exitPNL: 0,
		stopPNL: 0
	};

	precisionStore.subscribe((p) => {
		precision = p;
	});

	traderStore.subscribe((t) => {
		traderOptions = t;
	});

	let currentPrice;

	priceStore.subscribe((p) => {
		currentPrice = p;
		if (baseQuantity && currentPrice) {
			coinQuantity = baseQuantity / currentPrice;
			if (roundedUp) {
				coinQuantity = Math.ceil(coinQuantity);
			}
			total = coinQuantity * currentPrice;
		}
	});

	function handleClickPrice(e) {
		console.log(e);
		// traderStore.update({
		// 	currentPrice
		// });
	}

	onMount(() => {
		document.addEventListener('clickPrice', handleClickPrice);
	});
</script>

{#if traderOptions != undefined}
	<form class="p-2">
		<span class="pb-2 text-xs font-ibm text-slate-400">Trader</span>
		<div
			class="p-4 rounded-md max-w-md bg-mirage grid grid-cols-2 gap-6 font-ibm text-slate-400 text-sm"
		>
			<div class="mt-2 price css-1oo4jp1 font-ibm">
				<div class=" css-17sjuxz">
					<div class="bn-input-prefix css-vurnku">
						<label data-bn-type="text" for="FormRow-BUY-price" class="css-10wa3hs">Price</label>
					</div>
					<input
						data-bn-type="input"
						lang="en"
						id="FormRow-BUY-price"
						name="price"
						class=" css-1wlt96c bg-neutral-800 focus:outline-none focus:ring-0"
						min="0.001"
						step="0.001"
						type="number"
						value={currentPrice}
					/>
					<div class="bn-input-suffix css-vurnku">
						<label data-bn-type="text" for="FormRow-BUY-price" class="css-1vj6pu">USDT</label>
					</div>
				</div>
			</div>
			<label for="">{total} LIMIT</label>
			<div class="flex items-center border-b border-slate-400 py-0 relative group">
				<input
					class="appearance-none bg-transparent  border-none w-full text-slate-400 mr-3 py-0 px-0 leading-tight focus:outline-none focus:ring-0"
					type="text"
					aria-label="Amount {traderOptions.base}"
					id="amount-usd"
					bind:value={baseQuantity}
				/>

				<label
					for="amount-usd"
					class="transform transition-all cursor-text absolute top-0 left-0 h-full flex items-center  group-focus-within:text-xs group-focus-within:text-teal-500 peer-valid:text-xs peer-valid:text-teal-500 group-focus-within:h-1/2 peer-valid:h-1/2 group-focus-within:-translate-y-full peer-valid:-translate-y-full group-focus-within:pl-0 peer-valid:pl-0"
					>Amount</label
				>

				<span class="flex-shrink-0 border-transparent text-teal-500 text-sm py-1 px-2 pr-0">
					{traderOptions.base}
				</span>
			</div>
			<div class="flex items-center border-b border-slate-400 py-0 relative group">
				<input
					class="appearance-none bg-transparent  border-none w-full text-slate-400 mr-3 py-0 px-0 leading-tight focus:outline-none focus:ring-0 novalidate"
					type="text"
					aria-label="Amount {traderOptions.coin}"
					id="amount-coin"
					bind:value={coinQuantity}
				/>

				<label
					for="amount-coin"
					class="transform transition-all cursor-text absolute top-0 left-0 h-full flex items-center  group-focus-within:text-xs group-focus-within:text-teal-500 peer-valid:text-xs peer-valid:text-teal-500 group-focus-within:h-1/2 peer-valid:h-1/2 group-focus-within:-translate-y-full peer-valid:-translate-y-full group-focus-within:pl-0 peer-valid:pl-0"
					>Amount</label
				>

				<span class="flex-shrink-0 border-transparent text-teal-500 text-sm py-1 px-2 pr-0">
					{traderOptions.coin}
				</span>
			</div>
			<label class="inline-flex items-center mt-2">
				<input
					type="checkbox"
					class="border-gray-700 rounded bg-neutral-800 focus:border-slate-500"
					bind:checked={roundedUp}
				/>
				<span class="ml-2">Rounded Up</span>
			</label>
			<div class="col-span-2">
				<button
					class=" block w-full px-4 py-2 text-white bg-green-700 hover:bg-green-500 rounded-md  focus:outline-none focus:ring-0"
					type="submit"
				>
					Buy {coinQuantity}
					{traderOptions.coin}
				</button>
			</div>

			<span class="col-span-2">Strategy</span>

			<div class="flex items-center border-b border-slate-400 py-0 relative group">
				<input
					class="appearance-none bg-transparent  border-none w-full text-slate-400 mr-3 py-0 px-0 leading-tight focus:outline-none focus:ring-0 novalidate"
					type="text"
					aria-label="Amount {traderOptions.coin}"
					id="amount-coin"
					bind:value={coinQuantity}
				/>

				<label
					for="amount-coin"
					class="transform transition-all cursor-text absolute top-0 left-0 h-full flex items-center  group-focus-within:text-xs group-focus-within:text-teal-500 peer-valid:text-xs peer-valid:text-teal-500 group-focus-within:h-1/2 peer-valid:h-1/2 group-focus-within:-translate-y-full peer-valid:-translate-y-full group-focus-within:pl-0 peer-valid:pl-0"
					>Take Profit</label
				>

				<span class="flex-shrink-0 border-transparent text-teal-500 text-sm py-1 px-2 pr-0">
					{traderOptions.base}
				</span>
			</div>
			<div class="flex items-center border-b border-slate-400 py-0 relative group">
				<input
					class="appearance-none bg-transparent  border-none w-full text-slate-400 mr-3 py-0 px-0 leading-tight focus:outline-none focus:ring-0 novalidate"
					type="text"
					aria-label="Amount {traderOptions.coin}"
					id="amount-coin"
					bind:value={coinQuantity}
				/>

				<label
					for="amount-coin"
					class="transform transition-all cursor-text absolute top-0 left-0 h-full flex items-center  group-focus-within:text-xs group-focus-within:text-teal-500 peer-valid:text-xs peer-valid:text-teal-500 group-focus-within:h-1/2 peer-valid:h-1/2 group-focus-within:-translate-y-full peer-valid:-translate-y-full group-focus-within:pl-0 peer-valid:pl-0"
					>Gain</label
				>

				<span class="flex-shrink-0 border-transparent text-teal-500 text-sm py-1 px-2 pr-0">
					%
				</span>
			</div>
			<div class="flex items-center border-b border-slate-400 py-0 relative group">
				<input
					class="appearance-none bg-transparent  border-none w-full text-slate-400 mr-3 py-0 px-0 leading-tight focus:outline-none focus:ring-0 novalidate"
					type="text"
					aria-label="Amount {traderOptions.coin}"
					id="amount-coin"
					bind:value={coinQuantity}
				/>

				<label
					for="amount-coin"
					class="transform transition-all cursor-text absolute top-0 left-0 h-full flex items-center  group-focus-within:text-xs group-focus-within:text-teal-500 peer-valid:text-xs peer-valid:text-teal-500 group-focus-within:h-1/2 peer-valid:h-1/2 group-focus-within:-translate-y-full peer-valid:-translate-y-full group-focus-within:pl-0 peer-valid:pl-0"
					>Stop loss</label
				>

				<span class="flex-shrink-0 border-transparent text-teal-500 text-sm py-1 px-2 pr-0">
					{traderOptions.base}
				</span>
			</div>
			<div class="flex items-center border-b border-slate-400 py-0 relative group">
				<input
					class="appearance-none bg-transparent  border-none w-full text-slate-400 mr-3 py-0 px-0 leading-tight focus:outline-none focus:ring-0 novalidate"
					type="text"
					aria-label="Amount {traderOptions.coin}"
					id="amount-coin"
					bind:value={coinQuantity}
				/>

				<label
					for="amount-coin"
					class="transform transition-all cursor-text absolute top-0 left-0 h-full flex items-center  group-focus-within:text-xs group-focus-within:text-teal-500 peer-valid:text-xs peer-valid:text-teal-500 group-focus-within:h-1/2 peer-valid:h-1/2 group-focus-within:-translate-y-full peer-valid:-translate-y-full group-focus-within:pl-0 peer-valid:pl-0"
					>Loss</label
				>

				<span class="flex-shrink-0 border-transparent text-teal-500 text-sm py-1 px-2 pr-0">
					%
				</span>
			</div>
			<div class="font-ibm text-slate-200 mt-6">
				<h3 class="mb-2 font-semibold underline">Strategy</h3>
				<ul class="text-sm">
					<li>Target Price: +6% | 5xATR</li>
					<li>Stop Loss: -2% | 2xATR</li>
					<li>Trailing Stop - When Target 2%</li>
					<li>Trailing Target - On TP: Cancel SL and trail 1%</li>
					<li>Keep profit in coins</li>
				</ul>
			</div>
		</div>
	</form>
{/if}

<style>
	.css-15aumdt {
		box-sizing: border-box;
		margin: 0px;
		min-width: 0px;
		padding: 12px 16px 16px;
		margin-top: 0px;
		margin-right: 0px;
		margin-bottom: 0px;
		margin-left: 0px;
		padding-top: 12px;
		padding-right: 16px;
		padding-bottom: 16px;
		padding-left: 16px;
	}

	.css-1k6oqhc {
		box-sizing: border-box;
		margin: 0px;
		min-width: 0px;
		z-index: 23;
		font-size: 14px;
		color: rgb(234, 236, 239);
		position: relative;
		user-select: none;
		border-top-left-radius: 10px;
		border-top-right-radius: 10px;
		background: rgb(30, 33, 38);
		transition: transform 0.3s ease-in-out 0s;
		transform: translate3d(0px, 0px, 0px);
		margin-top: 0px;
		margin-right: 0px;
		margin-bottom: 0px;
		margin-left: 0px;
		background-image: initial;
		background-position-x: initial;
		background-position-y: initial;
		background-size: initial;
		background-repeat-x: initial;
		background-repeat-y: initial;
		background-attachment: initial;
		background-origin: initial;
		background-clip: initial;
		background-color: rgb(30, 33, 38);
		transition-duration: 0.3s;
		transition-timing-function: ease-in-out;
		transition-delay: 0s;
		transition-property: transform;
	}

	.css-e4zj7m {
		box-sizing: border-box;
		margin: 0px;
		min-width: 0px;
		width: 100%;
		overflow-y: initial;
		overflow-x: visible;
		position: fixed;
		z-index: 1;
		bottom: 0px;
		height: 72px;
		background-color: rgb(30, 32, 38);
		grid-area: orderform / orderform / orderform / orderform;
		margin-top: 0px;
		margin-right: 0px;
		margin-bottom: 0px;
		margin-left: 0px;
		grid-row-start: orderform;
		grid-column-start: orderform;
		grid-row-end: orderform;
		grid-column-end: orderform;
	}

	.css-1wqfcvt {
		box-sizing: border-box;
		margin: 0px;
		min-width: 0px;
		position: absolute;
		z-index: 0;
		inset: 0px;
		padding-top: 0px;
		margin-top: 0px;
		margin-right: 0px;
		margin-bottom: 0px;
		margin-left: 0px;
		top: 0px;
		left: 0px;
		right: 0px;
		bottom: 0px;
	}

	.css-s5kmpg {
		box-sizing: border-box;
		margin: 0px;
		min-width: 0px;
		position: relative;
		grid-area: orderform / orderform / orderform / orderform;
		z-index: auto;
		width: 100%;
		height: 100%;
		margin-top: 0px;
		margin-right: 0px;
		margin-bottom: 0px;
		margin-left: 0px;
		grid-row-start: orderform;
		grid-column-start: orderform;
		grid-row-end: orderform;
		grid-column-end: orderform;
	}

	.css-188h8f7 {
		box-sizing: border-box;
		margin: 0px;
		min-width: 0px;
		z-index: 3;
		margin-top: 0px;
		margin-right: 0px;
		margin-bottom: 0px;
		margin-left: 0px;
	}

	.react-grid-item.cssTransforms {
		transition-property: transform;
	}

	.css-188h8f7:hover {
		z-index: 4;
	}

	.react-grid-layout {
		position: relative;
		transition: height 200ms ease 0s;
		transition-duration: 200ms;
		transition-timing-function: ease;
		transition-delay: 0s;
		transition-property: height;
	}

	.css-1avh5mf {
		box-sizing: border-box;
		margin: 0px;
		min-width: 0px;
		grid-area: content / content / content / content;
		height: 100%;
		width: 100%;
		margin-top: 0px;
		margin-right: 0px;
		margin-bottom: 0px;
		margin-left: 0px;
		grid-row-start: content;
		grid-column-start: content;
		grid-row-end: content;
		grid-column-end: content;
	}

	.css-1s8r8vp {
		box-sizing: border-box;
		margin: 0px;
		min-width: 0px;
		display: grid;
		width: 100vw;
		height: 100%;
		min-height: 100vh;
		background-color: rgb(37, 41, 48);
		gap: 1px;
		grid-template-columns: 1fr;
		grid-template-rows: minmax(64px, auto) 1fr 24px;
		grid-template-areas: 'header' 'content' 'footer';
		margin-top: 0px;
		margin-right: 0px;
		margin-bottom: 0px;
		margin-left: 0px;
		row-gap: 1px;
		column-gap: 1px;
	}

	.css-7elqhi {
		box-sizing: border-box;
		margin: 0px;
		min-width: 0px;
		width: 100%;
		height: 100%;
		display: none;
		margin-top: 0px;
		margin-right: 0px;
		margin-bottom: 0px;
		margin-left: 0px;
	}

	@media screen and (min-width: 1024px) {
		.css-7elqhi {
			display: block;
		}
	}

	body {
		font-family: BinancePlex, Arial, sans-serif !important;
	}

	body {
		margin: 0px;
		height: 100%;
		width: 100vw;
		overflow-y: auto;
		background-color: rgb(20, 21, 26);
		overflow-x: hidden !important;
		margin-top: 0px;
		margin-right: 0px;
		margin-bottom: 0px;
		margin-left: 0px;
	}

	html body {
		font-family: BinancePlex, Arial, sans-serif !important;
	}

	html {
		height: 100%;
		background-color: rgb(20, 21, 26);
	}

	.css-1oo4jp1 {
		margin: 16px 0px 8px;
		min-width: 0px;
		width: 100%;
		box-sizing: border-box;
		border-radius: 4px;
		height: 40px;
		line-height: 40px;
		background-color: rgba(43, 47, 54, 0.9);
		margin-right: 0px;
		margin-left: 0px;
		border-top-left-radius: 4px;
		border-top-right-radius: 4px;
		border-bottom-right-radius: 4px;
		border-bottom-left-radius: 4px;
		margin-top: 16px;
		margin-bottom: 8px;
	}

	.price {
		margin-top: 0px;
		margin-bottom: 12px;
	}

	.scrollBar:hover:-webkit-scrollbar,
	:-webkit-scrollbar {
		width: 5px;
		height: 6px;
	}

	:-webkit-scrollbar-thumb {
		background: rgb(94, 102, 115);
		border-radius: 3px;
		height: 90px;
		background-image: initial;
		background-position-x: initial;
		background-position-y: initial;
		background-size: initial;
		background-repeat-x: initial;
		background-repeat-y: initial;
		background-attachment: initial;
		background-origin: initial;
		background-clip: initial;
		background-color: rgb(94, 102, 115);
		border-top-left-radius: 3px;
		border-top-right-radius: 3px;
		border-bottom-right-radius: 3px;
		border-bottom-left-radius: 3px;
	}

	:-webkit-scrollbar-track {
		background: transparent;
		background-image: initial;
		background-position-x: initial;
		background-position-y: initial;
		background-size: initial;
		background-repeat-x: initial;
		background-repeat-y: initial;
		background-attachment: initial;
		background-origin: initial;
		background-clip: initial;
		background-color: transparent;
	}

	.css-17sjuxz {
		box-sizing: border-box;
		margin: 0px;
		min-width: 0px;
		display: inline-flex;
		position: relative;
		align-items: center;
		line-height: 1.6;
		border: 1px solid rgba(43, 47, 54, 0.8);
		border-radius: 4px;
		width: 100%;
		height: 100%;
		font-size: 14px;
		margin-right: 0px;
		margin-left: 0px;
		margin-bottom: 0px;
		border-top-width: 1px;
		border-right-width: 1px;
		border-bottom-width: 1px;
		border-left-width: 1px;
		border-top-style: solid;
		border-right-style: solid;
		border-bottom-style: solid;
		border-left-style: solid;
		border-image-source: initial;
		border-image-slice: initial;
		border-image-width: initial;
		border-image-outset: initial;
		border-image-repeat: initial;
		border-top-color: rgba(43, 47, 54, 0.8);
		border-right-color: rgba(43, 47, 54, 0.8);
		border-bottom-color: rgba(43, 47, 54, 0.8);
		border-left-color: rgba(43, 47, 54, 0.8);
		border-top-left-radius: 4px;
		border-top-right-radius: 4px;
		border-bottom-right-radius: 4px;
		border-bottom-left-radius: 4px;
		margin-top: 0px;
	}

	.css-17sjuxz:hover:not(.bn-input-status-disabled):not(.bn-input-status-error) {
		border-color: rgb(240, 185, 11);
		border-top-color: rgb(240, 185, 11);
		border-right-color: rgb(240, 185, 11);
		border-bottom-color: rgb(240, 185, 11);
		border-left-color: rgb(240, 185, 11);
	}

	.css-17sjuxz .bn-input-prefix {
		flex-shrink: 0;
		margin-left: 8px;
		min-width: 48px;
		font-size: 14px;
		color: rgb(183, 189, 198);
	}

	.css-1wlt96c {
		box-sizing: border-box;
		margin: 0px;
		min-width: 0px;
		width: 100%;
		height: 100%;
		padding: 0px;
		outline: none;
		opacity: 1;
		border: none !important;
		margin-top: 0px;
		margin-right: 0px;
		margin-bottom: 0px;
		margin-left: 0px;
		padding-top: 0px;
		padding-right: 0px;
		padding-bottom: 0px;
		padding-left: 0px;
		outline-color: initial;
		outline-style: none;
		outline-width: initial;
		border-top-width: initial !important;
		border-right-width: initial !important;
		border-bottom-width: initial !important;
		border-left-width: initial !important;
		border-top-style: none !important;
		border-right-style: none !important;
		border-bottom-style: none !important;
		border-left-style: none !important;
		border-top-color: initial !important;
		border-right-color: initial !important;
		border-bottom-color: initial !important;
		border-left-color: initial !important;
		border-image-source: initial !important;
		border-image-slice: initial !important;
		border-image-width: initial !important;
		border-image-outset: initial !important;
		border-image-repeat: initial !important;
	}

	.css-17sjuxz input {
		color: rgb(234, 236, 239);
		font-size: 14px;
		padding-left: 4px;
		padding-right: 4px;
		text-align: right;
	}

	.bn-input-suffix {
		margin-left: 8px;
	}

	.css-17sjuxz .bn-input-suffix {
		flex-shrink: 0;
		margin-right: 8px;
		font-size: 14px;
		color: rgb(132, 142, 156);
	}

	.css-10wa3hs {
		box-sizing: border-box;
		margin: 0px;
		min-width: 0px;
		font-size: 14px;
		color: rgb(132, 142, 156);
		display: inline-block;
		text-align: right;
		margin-top: 0px;
		margin-right: 0px;
		margin-bottom: 0px;
		margin-left: 0px;
	}

	.css-1vj6pu {
		box-sizing: border-box;
		margin: 0px;
		min-width: 0px;
		font-size: 14px;
		color: rgb(234, 236, 239);
		display: inline-block;
		text-align: right;
		margin-top: 0px;
		margin-right: 0px;
		margin-bottom: 0px;
		margin-left: 0px;
	}
</style>
