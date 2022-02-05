import websocketStore from 'svelte-websocket-store';

const initialValue = {};
export const ticketStore = websocketStore(
	'wss://stream.binance.com:9443/ws/btcusdt@miniTicker',
	initialValue,
	[]
);
