<script>
	import Chart from 'chart.js/auto';
	import { onMount } from 'svelte';
	let canvas;

	export let current,
		low,
		high,
		poc = 100;

	onMount(() => {
		new Chart(canvas, {
			type: 'bar',

			data: {
				labels: [''],
				datasets: [
					{
						data: [poc],
						borderWidth: 0,
						borderColor: 'rgba(36, 196, 95, 1.0)',
						backgroundColor: 'rgba(36, 196, 95, 0.9)'
					},

					{
						data: [current],

						borderWidth: 10,
						borderColor: '#ff0000',
						backgroundColor: 'transparent'
					}
				]
			},
			options: {
				indexAxis: 'y',
				events: [],
				plugins: {
					legend: {
						display: false
					}
				},
				scales: {
					x: {
						display: false
					},
					y: {
						stacked: true,
						display: false,
						min: low,
						max: high
					}
				}
			}
		});
	});
</script>

<canvas bind:this={canvas} width="80" height="20" class="bg-slate-800" />
