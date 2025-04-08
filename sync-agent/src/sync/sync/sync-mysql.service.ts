import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Asiento } from '../../mysql/asiento/entities/asiento.entity';
import { Repository } from 'typeorm';
import io from 'socket.io-client';





@Injectable()
export class SyncMysqlService implements OnModuleInit {
  private readonly logger = new Logger(SyncMysqlService.name);
  private socket: any;

  constructor(
    @InjectRepository(Asiento)
    private asientoMySQLRepo: Repository<Asiento>,
  ) {}

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
      await this.handleSync(payload);
    });
  }

  async handleSync(payload: any) {
    const { table, action, data, vectorClock, nodoOrigen } = payload;

    const isNewer = await this.isDataNewer(table, data.idAsiento || data.id, vectorClock);
    if (!isNewer) {
      this.logger.warn(`🔄 Dato obsoleto de ${nodoOrigen}. Ignorando...`);
      return;
    }

    await this.applyLocalChanges(table, action, data, vectorClock);
    this.logger.log(`🔄 Sincronizado ${table} desde ${nodoOrigen}`);
  }

  private async isDataNewer(table: string, id: number, remoteClock: any): Promise<boolean> {
    const localData = await this.getLocalMySQLData(table, id);
    if (!localData) return true;

    const localClock = localData.vectorClock || {};
    return Object.keys(remoteClock).every(
      node => (remoteClock[node] || 0) >= (localClock[node] || 0)
    );
  }

  private async applyLocalChanges(
    table: string,
    action: 'INSERT' | 'UPDATE' | 'DELETE',
    data: any,
    vectorClock: Record<string, number>,
  ): Promise<void> {
    const entity = { ...data, vectorClock };

    if (table === 'asientos') {
      if (action === 'DELETE') {
        await this.asientoMySQLRepo.delete({ idAsiento: entity.idAsiento });
      } else if (action === 'INSERT') {
        await this.asientoMySQLRepo.save(entity);
      } else {
        await this.asientoMySQLRepo.update({ idAsiento: entity.idAsiento }, entity);
      }
    }
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
