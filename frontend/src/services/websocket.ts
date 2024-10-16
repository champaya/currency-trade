import { io, Socket } from 'socket.io-client';

const SOCKET_URL = 'http://localhost:3000'; // Replace with your actual WebSocket server URL

const socket: Socket = io(SOCKET_URL);

interface Rate {
  currency_pair: string;
  rate: number;
}

export const subscribeToRates = (callback: (rates: Rate[]) => void): void => {
  socket.on('rates', callback);
};

export const unsubscribeFromRates = (): void => {
  socket.off('rates');
};

export default socket;