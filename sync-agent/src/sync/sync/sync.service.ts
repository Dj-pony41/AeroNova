// src/sync/sync/sync.service.ts
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Asiento } from '../../mysql/asiento/entities/asiento.entity';
import { MongoAsiento } from '../../mongo/asiento/entities/asiento.entity';
import io from 'socket.io-client';

@Injectable()
export class SyncService implements OnModuleInit {
  private readonly logger = new Logger(SyncService.name);
  private socket: any;

  constructor(
    @InjectRepository(Asiento)
    private asientoMySQLRepo: Repository<Asiento>,

    @InjectModel(MongoAsiento.name)
    private asientoMongoModel: Model<MongoAsiento>,
  ) {}

  // ==================== INIT WEBSOCKET ====================
  onModuleInit() {
    this.initWebSocket();
  }

  private initWebSocket() {
    this.socket = io(process.env.WS_SERVER_URL || 'http://localhost:3001', {
      reconnection: true,
      reconnectionDelay: 5000,
      transports: ['websocket'], // Fuerza usar WebSocket
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
  }

  // ==================== CORE SYNC LOGIC ====================
  async handleSync(payload: {
    table: string;
    action: 'INSERT' | 'UPDATE' | 'DELETE';
    data: any;
    vectorClock: Record<string, number>;
    nodoOrigen: string;
  }): Promise<void> {
    const { table, action, data, vectorClock, nodoOrigen } = payload;

    try {
      // 1. Validar conexión WebSocket
      if (!this.socket?.connected) {
        throw new Error('WebSocket no conectado');
      }

      // 2. Verificar si el dato es más reciente
      const isNewer = await this.isDataNewer(table, data.idAsiento || data.id, vectorClock);
      if (!isNewer) {
        this.logger.warn(`🔄 Dato obsoleto de ${nodoOrigen}. Ignorando...`);
        return;
      }

      // 3. Aplicar cambios locales
      await this.applyLocalChanges(table, action, data, vectorClock);

      // 4. Propagar a otros nodos (excepto al origen)
      this.propagateChanges(payload);

      this.logger.log(`🔄 Sincronizado ${table} desde ${nodoOrigen}`);

    } catch (error) {
      this.logger.error(`❌ Error en sync: ${error.message}`);
    }
  }

  // ==================== VECTOR CLOCK COMPARISON ====================
  private async isDataNewer(
    table: string,
    id: number,
    remoteClock: Record<string, number>,
  ): Promise<boolean> {
    try {
      const localData = this.isMySQLNode()
        ? await this.getLocalMySQLData(table, id)
        : await this.getLocalMongoData(table, id);

      // Si no existe localmente, aceptar el remoto
      if (!localData) return true;

      const localClock = localData.vectorClock || {};

      // Comparar cada nodo del reloj vectorial
      return Object.keys(remoteClock).every(
        node => (remoteClock[node] || 0) >= (localClock[node] || 0),
      );

    } catch (error) {
      this.logger.error(`⏱️ Error al comparar relojes: ${error.message}`);
      return false;
    }
  }

  // ==================== DATABASE OPERATIONS ====================
  private async applyLocalChanges(
    table: string,
    action: 'INSERT' | 'UPDATE' | 'DELETE',
    data: any,
    vectorClock: Record<string, number>,
  ): Promise<void> {
    const entity = { ...data, vectorClock };

    switch (table) {
      case 'asientos':
        if (this.isMySQLNode()) {
          await this.handleMySQLAsiento(action, entity);
        } else {
          await this.handleMongoAsiento(action, entity);
        }
        break;
      // Añadir más tablas aquí (transacciones, vuelos, etc.)
      default:
        this.logger.warn(`📌 Tabla no soportada: ${table}`);
    }
  }

  private async handleMySQLAsiento(
    action: 'INSERT' | 'UPDATE' | 'DELETE',
    data: any,
  ): Promise<void> {
    if (action === 'DELETE') {
      await this.asientoMySQLRepo.delete({ idAsiento: data.idAsiento });
    } else if (action === 'INSERT') {
      await this.asientoMySQLRepo.save(data);
    } else {
      await this.asientoMySQLRepo.update({ idAsiento: data.idAsiento }, data);
    }
  }

  private async handleMongoAsiento(
    action: 'INSERT' | 'UPDATE' | 'DELETE',
    data: any,
  ): Promise<void> {
    if (action === 'DELETE') {
      await this.asientoMongoModel.deleteOne({ idAsiento: data.idAsiento });
    } else {
      await this.asientoMongoModel.updateOne(
        { idAsiento: data.idAsiento },
        { $set: data },
        { upsert: true },
      );
    }
  }

  // ==================== HELPERS ====================
  private propagateChanges(payload: any): void {
    if (this.socket.connected) {
      this.socket.emit('sync_data', payload);
    } else {
      this.logger.warn('📡 Reintentando envío en 5 segundos...');
      setTimeout(() => this.propagateChanges(payload), 5000);
    }
  }

  private async getLocalMySQLData(table: string, id: number): Promise<any> {
    switch (table) {
      case 'asientos':
        return this.asientoMySQLRepo.findOne({ 
          where: { idAsiento: id },
          select: ['vectorClock'],
        });
      // Añadir más tablas aquí
      default:
        return null;
    }
  }

  private async getLocalMongoData(table: string, id: number): Promise<any> {
    switch (table) {
      case 'asientos':
        return this.asientoMongoModel.findOne(
          { idAsiento: id },
          { vectorClock: 1, _id: 0 },
        ).lean();
      // Añadir más tablas aquí
      default:
        return null;
    }
  }

  private isMySQLNode(): boolean {
    return process.env.DB_TYPE === 'mysql';
  }
}