import { io } from 'socket.io-client';

const URL = 'https://shot-clock-server.fly.dev:443';

function generateUniqueId() {
    const timestamp = Date.now().toString(36);
    const randomChars = Math.random().toString(36).substr(2, 5);
    const uniqueId = timestamp + '-' + randomChars;
    return uniqueId;
}

export function getSocket() {
    if (!localStorage.getItem('clientId')) {
        localStorage.setItem('clientId', generateUniqueId());
    }

    return io(URL, {
        autoConnect: false,
        query: {
            clientId: localStorage.getItem('clientId')
        }
    });
}