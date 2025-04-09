import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import io from 'socket.io-client';
import { AsientoService } from 'src/mongo/asiento/asiento.service';

@Injectable()
export class SyncMongoService implements OnModuleInit {
  private readonly logger = new Logger(SyncMongoService.name);
  private socket: any;

  constructor(
    private readonly asientoService: AsientoService,
  ) {}

  onModuleInit() {
    this.initWebSocket();
  }

  private initWebSocket() {
    this.socket = io(process.env.WS_SERVER_URL || 'http://localhost:3001', {
      reconnection: true,
      reconnectionDelay: 5000,
      transports: ['websocket'],
    });

    this.socket.on('connect', () => {
      this.logger.log(`✅ Conectado a WebSocket (Nodo: ${process.env.NODE_ID})`);
    });

    this.socket.on('disconnect', () => {
      this.logger.warn('⚠️ Desconectado de WebSocket. Reintentando...');
    });

    this.socket.on('connect_error', (error: any) => {
      this.logger.error(`🚨 Error en WebSocket: ${error.message}`);
    });

    this.socket.on('sync_data', async (payload: any) => {
      console.log('📥 Evento sync_data recibido en Mongo:', JSON.stringify(payload, null, 2));
      await this.handleSync(payload);
    });
  }

  async handleSync(payload: {
    table: string;
    action: 'INSERT' | 'UPDATE' | 'DELETE';
    data: any;
    vectorClock: Record<string, number>;
    nodoOrigen: string;
  }): Promise<void> {
    const { table, action, data, vectorClock, nodoOrigen } = payload;

    try {
      if (table === 'asientos') {
        if ('_id' in data) delete data._id;

        if (action === 'DELETE') {
          await this.asientoService.delete(data.idAsiento);
        } else {
          await this.asientoService.syncUpdate(data.idAsiento, {
            ...data,
            vectorClock,
          });
        }

        this.logger.log(`🔄 Sincronizado ${table} desde ${nodoOrigen}`);
      }

      // 👇 Aquí puedes agregar más tablas fácilmente
      /*
      else if (table === 'pasajeros') {
        ...
      }
      */

    } catch (error) {
      this.logger.error(`❌ Error al sincronizar ${table}:`, error);
    }
  }
}
