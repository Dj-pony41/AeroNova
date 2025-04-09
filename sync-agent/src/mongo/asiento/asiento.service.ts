import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MongoAsiento } from './entities/asiento.entity';
import { CreateAsientoDto } from './dto/create-asiento.dto';
import { WebSocketClient } from '../../sync/websocket.client';

@Injectable()
export class AsientoService {
  constructor(
    @InjectModel(MongoAsiento.name)
    private asientoModel: Model<MongoAsiento>,
    private wsClient: WebSocketClient
  ) {}

  async findAll(): Promise<MongoAsiento[]> {
    return this.asientoModel.find().lean();
  }

  async createOrUpdate(id: number, dto: CreateAsientoDto): Promise<MongoAsiento> {
    dto.idAsiento = id;

    const existing = await this.asientoModel.findOne({ idAsiento: id });

    const localNode = process.env.NODE_ID || 'nodo_mongo';
    const oldClock = existing?.vectorClock || {
      nodo_mysql_1: 0,
      nodo_mysql_2: 0,
      nodo_mongo: 0,
    };

    oldClock[localNode] = (oldClock[localNode] || 0) + 1;

    const asiento = {
      ...dto,
      vectorClock: oldClock,
      ultimaActualizacion: Date.now(),
    };

    await this.asientoModel.updateOne(
      { idAsiento: id },
      { $set: asiento },
      { upsert: true }
    );

    this.wsClient.emitToAll('sync_data', {
      table: 'asientos',
      action: existing ? 'UPDATE' : 'INSERT',
      data: asiento,
      vectorClock: oldClock,
      nodoOrigen: localNode,
    });

    return asiento as any;
  }
}
