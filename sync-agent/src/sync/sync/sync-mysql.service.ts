import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Asiento } from '../../mysql/asiento/entities/asiento.entity';
import { Repository } from 'typeorm';
import { AsientoService } from '../../mysql/asiento/asiento.service';
import { PasajeroService } from 'src/mysql/pasajero/pasajero.service';
import io from 'socket.io-client';

import Long from 'long';

@Injectable()
export class SyncMysqlService implements OnModuleInit {
  private readonly logger = new Logger(SyncMysqlService.name);
  private socket: any;

  constructor(
    @InjectRepository(Asiento)
    private asientoMySQLRepo: Repository<Asiento>,
    private readonly asientoService: AsientoService,
    private readonly pasajeroService: PasajeroService,
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
  
    if (table === 'asientos') {
      try {
        // Eliminar _id si viene de MongoDB
        if ('_id' in data) delete data._id;
  
        // Asegurarse de que el vectorClock esté presente
        data.vectorClock = vectorClock;
  
        // 🛠️ Convertir objeto Long de MongoDB a número si es necesario
        if (typeof data.ultimaActualizacion === 'object' && 'low' in data.ultimaActualizacion && 'high' in data.ultimaActualizacion) {
          data.ultimaActualizacion = Long.fromBits(
            data.ultimaActualizacion.low,
            data.ultimaActualizacion.high
          ).toNumber();
        }
  
        if (action === 'DELETE') {
          await this.asientoService.deleteAsiento(data.idAsiento);
        } else if (action === 'INSERT') {
          await this.asientoService.createAsiento(data);
        } else if (action === 'UPDATE') {
          await this.asientoService.updateAsiento(data.idAsiento, data);
        }
  
        this.logger.log(`🔄 Sincronizado asientos desde ${nodoOrigen}`);
      } catch (error) {
        this.logger.error(`❌ Error al sincronizar asiento:`, error);
      }
    }
    if (table === 'pasajeros') {
      try {
        await this.pasajeroService.syncUpsert(data);
        this.logger.log(`🔄 Sincronizado pasajero desde ${nodoOrigen}`);
      } catch (err) {
        this.logger.error('❌ Error sincronizando pasajero:', err);
      }
    }
  
    // Aquí puedes agregar más bloques para otras tablas
  }

  private async isDataNewer(table: string, id: number, remoteClock: any): Promise<boolean> {
    const localData = await this.getLocalMySQLData(table, id);
    if (!localData) return true;

    const localClock = localData.vectorClock || {};
    return Object.keys(remoteClock).every(
      node => (remoteClock[node] || 0) >= (localClock[node] || 0),
    );
  }

  private async getLocalMySQLData(table: string, id: number): Promise<any> {
    if (table === 'asientos') {
      return this.asientoMySQLRepo.findOne({
        where: { idAsiento: id },
        select: ['vectorClock'],
      });
    }
    return null;
  }
}
