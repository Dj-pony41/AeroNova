// src/sync/sync/sync.getaway.ts
import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayInit,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway(3001, { cors: true }) // Puerto local para recibir conexiones entrantes
export class SyncGateway implements OnGatewayInit {
  @WebSocketServer()
  server: Server;

  afterInit() {
    console.log('🚀 WebSocket Gateway iniciado en puerto 3001');
  }

  @SubscribeMessage('ping')
  handlePing(client: any, payload: any) {
    console.log(`📡 Ping recibido de ${payload.nodeId}`);
    client.emit('pong', { from: process.env.NODE_ID });
  }
}
