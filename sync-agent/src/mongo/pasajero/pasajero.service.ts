// src/mongo/pasajero/pasajero.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MongoPasajero } from './entities/pasajero.entity';
import { UpdatePasajeroDto } from './dto/update-pasajero.dto';
import { WebSocketClient } from 'src/sync/websocket.client';

@Injectable()
export class PasajeroService {
  constructor(
    @InjectModel(MongoPasajero.name)
    private pasajeroModel: Model<MongoPasajero>,
    private wsClient: WebSocketClient,
  ) {}

  async findAll() {
    return this.pasajeroModel.find().lean();
  }

  async findByPasaporte(pasaporte: number): Promise<MongoPasajero | null> {
    return this.pasajeroModel.findOne({ pasaporte }).lean();
  }

  async createOrUpdate(pasaporte: number, dto: UpdatePasajeroDto): Promise<MongoPasajero> {
    dto.pasaporte = pasaporte;

    const existing = await this.pasajeroModel.findOne({ pasaporte }).lean();

    const pasajero = {
      ...existing,
      ...dto,
    };

    await this.pasajeroModel.updateOne(
      { pasaporte },
      { $set: pasajero },
      { upsert: true },
    );

    this.wsClient.emitToAll('sync_data', {
      table: 'pasajeros',
      action: 'UPDATE',
      data: pasajero,
      vectorClock: {}, // No usamos vector en esta entidad
      nodoOrigen: process.env.NODE_ID,
    });

    return pasajero as any;
  }
}
