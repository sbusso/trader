import { writable } from 'svelte/store';

function calculatePrecision(price: number) {
	if (price < 1) {
		return -1;
	}
	return Math.floor(Math.log10(price));
}

function createPrecisionStore() {
	const { subscribe, set, update } = writable(3);
	return {
		subscribe,
		setPrecision: (price: number) => update(() => Math.max(3 - calculatePrecision(price), 2)),
		set
	};
}

export const traderStore = writable({
	coin: 'BTC',
	base: 'USDT',
	exchange: 'BINANCE',
	precision: 3,
	interval: '15',
	depth: 20,
	increment: 0.01,
	price: undefined
});

export const precisionStore = createPrecisionStore();

export const priceStore = writable(0);
