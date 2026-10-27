import { io } from 'socket.io-client';

const SOCKET_SERVER_URL = import.meta.env.VITE_SOCKET_URL || 
  (import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL.replace('/api', '') : 'http://localhost:5000');

let socket = null;

try {
  socket = io(SOCKET_SERVER_URL, {
    autoConnect: true,
    reconnection: true,
    reconnectionAttempts: 5,
    reconnectionDelay: 2000,
    transports: ['websocket', 'polling']
  });

  socket.on('connect', () => {
    console.log('⚡ Connected to Hostel Management Real-time WebSocket Gateway');
  });

  socket.on('connect_error', () => {
    // Fail silently in offline / mock demo mode
  });
} catch (e) {
  console.warn('Socket.IO initialization deferred:', e);
}

export default socket;
