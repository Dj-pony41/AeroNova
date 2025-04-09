// src/sync/sync/sync.gateway.ts
import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayInit,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway(3001, { cors: true }) // Puerto local para recibir conexiones entrantes
export class SyncGateway implements OnGatewayInit {
  @WebSocketServer()
  server: Server;

  afterInit() {
    console.log('🚀 WebSocket Gateway iniciado en puerto 3001');
  }

  @SubscribeMessage('ping')
  handlePing(@ConnectedSocket() client: Socket, @MessageBody() payload: any) {
    console.log(`📡 Ping recibido de ${payload.nodeId}`);
    client.emit('pong', { from: process.env.NODE_ID });
  }

  // Agregamos el suscriptor para "sync_data"
  @SubscribeMessage('sync_data')
  handleSyncData(@ConnectedSocket() client: Socket, @MessageBody() payload: any) {
    console.log('📥 Evento sync_data recibido:', JSON.stringify(payload, null, 2));
    // Aquí puedes llamar a tu servicio de sincronización si lo deseas
    // Por ejemplo: this.syncMongoService.handleSync(payload);
  }
}
