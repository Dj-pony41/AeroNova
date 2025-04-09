import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayInit,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';
import { Optional } from '@nestjs/common';

// Importamos ambos servicios, marcados como opcionales
import { SyncMysqlService } from './sync-mysql.service';
import { SyncMongoService } from './sync-mongo.service';

@WebSocketGateway(3001, { cors: true, host: '0.0.0.0' })
export class SyncGateway implements OnGatewayInit {
  @WebSocketServer()
  server: Server;

  private readonly logger = new Logger(SyncGateway.name);

  // Inyectamos ambos servicios de forma opcional
  constructor(
    @Optional() private readonly syncMysqlService?: SyncMysqlService,
    @Optional() private readonly syncMongoService?: SyncMongoService,
  ) {}

  afterInit() {
    console.log('🚀 WebSocket Gateway iniciado en puerto 3001');
  }

  @SubscribeMessage('ping')
  handlePing(@ConnectedSocket() client: Socket, @MessageBody() payload: any) {
    console.log(`📡 Ping recibido de ${payload.nodeId}`);
    client.emit('pong', { from: process.env.NODE_ID });
  }

  @SubscribeMessage('sync_data')
  async handleSyncData(@ConnectedSocket() client: Socket, @MessageBody() payload: any) {
    console.log('📥 Evento sync_data recibido:', JSON.stringify(payload, null, 2));

    // Seleccionamos el servicio de sincronización basado en la variable de entorno DB_TYPE.
    const dbType = process.env.DB_TYPE?.toLowerCase();

    if (dbType === 'mysql' && this.syncMysqlService) {
      await this.syncMysqlService.handleSync(payload);
    } else if (dbType === 'mongodb' && this.syncMongoService) {
      await this.syncMongoService.handleSync(payload);
    } else {
      this.logger.error('No se encontró un servicio de sincronización apropiado para DB_TYPE:', process.env.DB_TYPE);
    }
  }
}
