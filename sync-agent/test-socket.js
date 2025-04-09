const io = require('socket.io-client');
const socket = io('http://192.168.0.11:3001', { transports: ['websocket'] });

socket.on('connect', () => {
  console.log('✅ Conectado al servidor Socket.IO');
  // Podés probar emitir un mensaje:
  socket.emit('ping', { nodeId: 'cliente_test balbal' });
});

socket.on('pong', (data) => {
  console.log('📬 Pong recibido:', data);
});
