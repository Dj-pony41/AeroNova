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

  async createOrUpdate(dto: CreateAsientoDto): Promise<MongoAsiento> {
    const existing = await this.asientoModel.findOne({ IdAsiento: dto.idAsiento });

    const localNode = process.env.NODE_ID || 'nodo_mongo';
    const newClock = existing?.vectorClock || { nodo1: 0, nodo2: 0, nodo3: 0 };
    newClock[localNode] = (newClock[localNode] || 0) + 1;

    const asiento = {
      ...dto,
      vectorClock: newClock,
      ultimaActualizacion: Date.now(),
    };

    await this.asientoModel.updateOne(
      { IdAsiento: dto.idAsiento },
      { $set: asiento },
      { upsert: true },
    );

    this.wsClient.emitToAll('sync_data', {
      table: 'asientos',
      action: existing ? 'UPDATE' : 'INSERT',
      data: asiento,
      vectorClock: newClock,
      nodoOrigen: localNode,
    });

    return asiento as any;
  }
}
