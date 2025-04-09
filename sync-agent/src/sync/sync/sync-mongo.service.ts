import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import io from 'socket.io-client';
import { AsientoService } from 'src/mongo/asiento/asiento.service';
import { PasajeroService } from 'src/mongo/pasajero/pasajero.service';
import { TransaccionService } from 'src/mongo/transaccion/transaccion.service';

import Long from 'long';




@Injectable()
export class SyncMongoService implements OnModuleInit {
  private readonly logger = new Logger(SyncMongoService.name);
  private socket: any;

  constructor(
    private readonly asientoService: AsientoService,
    private readonly pasajeroService: PasajeroService,
    private readonly transaccionService: TransaccionService,
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

      if (table === 'pasajeros') {
        try {
          if ('_id' in data) delete data._id;
      
          if (action === 'INSERT') {
            await this.pasajeroService.create(data);
          } else if (action === 'UPDATE') {
            await this.pasajeroService.update(data.Pasaporte, data);
          }
      
          this.logger.log(`🧾 Pasajero ${data.Pasaporte} sincronizado desde ${nodoOrigen}`);
        } catch (error) {
          this.logger.error(`❌ Error al sincronizar pasajero:`, error);
        }
      }
      

      if (table === 'transacciones') {
        try {
          if ('_id' in data) delete data._id;
      
          // Si viene desde Mongo, puede tener campos Long
          if (typeof data.FechaOperacion === 'object' && 'low' in data.FechaOperacion && 'high' in data.FechaOperacion) {
            data.FechaOperacion = Long.fromBits(
              data.FechaOperacion.low,
              data.FechaOperacion.high
            ).toNumber();
          }
      
          data.VectorClock = vectorClock;
      
          if (action === 'DELETE') {
            // Eliminar por IdTransaccion si lo deseas
            // await this.transaccionService.delete(data.IdTransaccion);
          } else if (action === 'INSERT') {
            await this.transaccionService.create(data);
          } else if (action === 'UPDATE') {
            await this.transaccionService.update(data.IdTransaccion, data);
          }
      
          this.logger.log(`🔄 Sincronizado transacción desde ${nodoOrigen}`);
        } catch (err) {
          this.logger.error('❌ Error sincronizando transacción:', err);
        }
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
