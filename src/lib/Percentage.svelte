<script>
	export let value = 0;

	const formatPercent = (num) => {
		return (num < 0 ? '' : '+') + num.toFixed(2) + '%';
	};
</script>

<span class={value >= 0 ? 'text-green-500' : 'text-red-500'}>{formatPercent(Number(value))}</span>
