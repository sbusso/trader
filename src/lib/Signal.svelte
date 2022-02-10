<script>
	export let signal = 0;
</script>

{#if signal >= 0.2}
	<div class="w-16 px-4 py-2 text-xs font-semibold text-center text-white bg-green-500 rounded-sm">
		BUY
	</div>
{:else if signal <= -0.2}
	<div class="w-16 px-4 py-2 text-xs font-semibold text-center text-white bg-red-500 rounded-sm ">
		SELL
	</div>
{:else}
	<div class="w-16 px-4 py-2 text-xs font-semibold text-center text-white bg-orange-500 rounded-sm">
		HOLD
	</div>
{/if}
