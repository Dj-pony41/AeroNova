import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MongoAsiento } from './entities/asiento.entity';
import { UpdateAsientoDto } from './dto/update-asiento.dto';
import { WebSocketClient } from '../../sync/websocket.client';
import { Long } from 'bson';


@Injectable()
export class AsientoService {
  delete(idAsiento: any) {
    throw new Error('Method not implemented.');
  }
  constructor(
    @InjectModel(MongoAsiento.name)
    private asientoModel: Model<MongoAsiento>,
    private wsClient: WebSocketClient
  ) {}

  async findAll(): Promise<MongoAsiento[]> {
    return this.asientoModel.find().lean();
  }
  async syncUpdate(id: number, dto: UpdateAsientoDto): Promise<MongoAsiento> {
    const existing = await this.asientoModel.findOne({ idAsiento: id }).lean();
  
    const asiento = {
      ...(existing || { idAsiento: id }),
      ...dto,
      ultimaActualizacion: dto.ultimaActualizacion,
      vectorClock: dto.vectorClock,
    };
  
    await this.asientoModel.updateOne(
      { idAsiento: id },
      { $set: asiento },
      { upsert: true }
    );
  
    return asiento as any;
  }
  

  async createOrUpdate(id: number, dto: UpdateAsientoDto): Promise<MongoAsiento> {
    dto.idAsiento = id;
  
    const existing = await this.asientoModel.findOne({ idAsiento: id }).lean();
  
    if (!existing) {
      throw new Error(`Asiento con idAsiento ${id} no existe en Mongo`);
    }
  
    const localNode = process.env.NODE_ID || 'nodo_mongo';
    const oldClock = existing.vectorClock || {
      nodo_mysql_1: 0,
      nodo_mysql_2: 0,
      nodo_mongo: 0,
    };
  
    oldClock[localNode] = (oldClock[localNode] || 0) + 1;
  
    const asiento = {
      ...existing,
      ...dto,
      vectorClock: oldClock,
      ultimaActualizacion: Long.fromNumber(
        typeof dto.ultimaActualizacion === 'number'
          ? dto.ultimaActualizacion
          : Date.now()
      ),
    };
    
    
    
  
    try {
      await this.asientoModel.updateOne(
        { idAsiento: id },
        { $set: asiento },
        { upsert: true }
      );
    } catch (err) {
      console.error('❌ Error al actualizar Mongo:', JSON.stringify(err, null, 2));
      throw err;
    }
    
  
    this.wsClient.emitToAll('sync_data', {
      table: 'asientos',
      action: 'UPDATE',
      data: asiento,
      vectorClock: oldClock,
      nodoOrigen: localNode,
    });
  
    return asiento as any;
  }
  
}
