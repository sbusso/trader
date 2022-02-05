<script>
	export let signal = 0;
</script>

{#if signal >= 0.2}
	<div class="w-16 text-center px-4 py-2 text-white rounded-sm bg-green-500 text-xs font-semibold">
		BUY
	</div>
{:else if signal <= -0.2}
	<div class="w-16 text-center  px-4 py-2 text-white rounded-sm bg-red-500 font-semibold text-xs">
		SELL
	</div>
{:else}
	<div class="w-16 text-center px-4 py-2 text-white rounded-sm bg-orange-500 font-semibold text-xs">
		HOLD
	</div>
{/if}
