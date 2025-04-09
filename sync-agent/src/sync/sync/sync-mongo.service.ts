// src/sync/sync/sync-mongo.service.ts
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MongoAsiento } from '../../mongo/asiento/entities/asiento.entity';
import io from 'socket.io-client';





@Injectable()
export class SyncMongoService implements OnModuleInit {
  private readonly logger = new Logger(SyncMongoService.name);
  private socket: any;

  constructor(
    @InjectModel(MongoAsiento.name)
    private asientoMongoModel: Model<MongoAsiento>,
  ) {}

  // ==================== INIT WEBSOCKET ====================
  onModuleInit() {
    this.initWebSocket();
  }

  private initWebSocket() {
    this.socket = io(process.env.WS_SERVER_URL || 'http://localhost:3001', 
 {
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

  // ==================== SYNC CORE ====================
  async handleSync(payload: {
    table: string;
    action: 'INSERT' | 'UPDATE' | 'DELETE';
    data: any;
    vectorClock: Record<string, number>;
    nodoOrigen: string;
  }): Promise<void> {
    const { table, action, data, vectorClock, nodoOrigen } = payload;
  
    const isNewer = await this.isDataNewer(table, data.idAsiento || data.id, vectorClock);
    if (!isNewer) {
      this.logger.warn(`🔄 Dato obsoleto de ${nodoOrigen}. Ignorando...`);
      return;
    }
  
    await this.applyLocalChanges(table, action, data, vectorClock);
    this.logger.log(`🔄 Sincronizado ${table} desde ${nodoOrigen}`);
  }
  

  // ==================== VECTOR CLOCK COMPARISON ====================
  private async isDataNewer(
    table: string,
    id: number,
    remoteClock: Record<string, number>,
  ): Promise<boolean> {
    const localData = await this.getLocalMongoData(table, id);
    if (!localData) return true;
  
    const localClock = localData.vectorClock || {};
  
    const isNewer = Object.keys(remoteClock).every(
      node => (remoteClock[node] || 0) >= (localClock[node] || 0)
    );
  
    this.logger.debug(`Comparando vector clocks:`);
    this.logger.debug(`Remoto: ${JSON.stringify(remoteClock)}`);
    this.logger.debug(`Local : ${JSON.stringify(localClock)}`);
    this.logger.debug(`¿Aplicar cambios?: ${isNewer}`);
  
    return isNewer;
  }
  

  // ==================== DB OPERATIONS ====================
  private async applyLocalChanges(
    table: string,
    action: 'INSERT' | 'UPDATE' | 'DELETE',
    data: any,
    vectorClock: Record<string, number>,
  ): Promise<void> {
    const entity = { ...data, vectorClock };
  
    if (table === 'asientos') {
      if (action === 'DELETE') {
        await this.asientoMongoModel.deleteOne({ idAsiento: entity.idAsiento });
        this.logger.log(`❌ Eliminado asiento con id ${entity.idAsiento}`);
      } else {
        await this.asientoMongoModel.updateOne(
          { idAsiento: entity.idAsiento },
          { $set: entity },
          { upsert: true },
        );
        this.logger.log(`🛠 Actualizado/inserto asiento con id ${entity.idAsiento}`);
      }
    }
  }
  

  private async getLocalMongoData(table: string, id: number): Promise<any> {
    if (table === 'asientos') {
      return this.asientoMongoModel.findOne(
        { idAsiento: id },
        { vectorClock: 1, _id: 0 },
      ).lean();
    }
    return null;
  }
}
