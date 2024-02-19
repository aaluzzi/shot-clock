import { io } from 'socket.io-client';

const URL = 'https://shot-clock-server.fly.dev:443';

export const socket = io(URL, {
    autoConnect: false,
});