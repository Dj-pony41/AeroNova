// src/sync/sync/sync.gateway.ts
import { WebSocketGateway, WebSocketServer, OnGatewayInit, SubscribeMessage } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { SyncService } from './sync.service';

@WebSocketGateway(3001, { cors: true }) // Puerto 3001 para comunicación entre nodos
export class SyncGateway implements OnGatewayInit {
  @WebSocketServer()
  server: Server;

  constructor(private syncService: SyncService) {}

  afterInit() {
    console.log('WebSocket Gateway iniciado en puerto 3001');
  }

  @SubscribeMessage('sync_data')
  async handleSync(client: any, payload: any) {
    await this.syncService.handleSync(payload);
    // Reenvía a otros nodos (excepto al remitente)
    client.broadcast.emit('sync_data', payload);
  }
}