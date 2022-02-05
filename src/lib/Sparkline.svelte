<script>
	import Chart from 'chart.js/auto';
	import { onMount } from 'svelte';
	let canvas;
	export let data = [];

	onMount(() => {
		let ctx = canvas.getContext('2d');
		let gradient = ctx.createLinearGradient(0, 0, 0, 40);
		gradient.addColorStop(0, 'rgba(36, 196, 95, 1.0)');
		gradient.addColorStop(1, 'rgba(36, 196, 95, 0)');

		new Chart(canvas, {
			type: 'line',
			data: {
				labels: data,
				datasets: [
					{
						data: data,
						fill: 'start',
						pointRadius: 0,
						spanGaps: true,
						tension: 0.1,
						borderWidth: 1.5,
						backgroundColor: gradient
					}
				]
			},
			options: {
				responsive: true,
				events: [],
				borderColor: 'rgba(36, 196, 95, 1.0)',

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
						display: false
					}
				}
			}
		});
	});
</script>

<canvas bind:this={canvas} width="100" height="40" />
