import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MongoPasajero } from './entities/pasajero.entity';
import { CreatePasajeroDto } from './dto/create-pasajero.dto';
import { UpdatePasajeroDto } from './dto/update-pasajero.dto';
import { WebSocketClient } from 'src/sync/websocket.client';

@Injectable()
export class PasajeroService {
  constructor(
    @InjectModel(MongoPasajero.name)
    private readonly pasajeroModel: Model<MongoPasajero>,
    private readonly wsClient: WebSocketClient,
  ) {}

  async findAll(): Promise<MongoPasajero[]> {
    return this.pasajeroModel.find().lean();
  }

  async findOne(pasaporte: number): Promise<MongoPasajero | null> {
    return this.pasajeroModel.findOne({ Pasaporte: pasaporte }).lean();
  }

  async create(dto: CreatePasajeroDto) {
    const creado = await this.pasajeroModel.create(dto);

    this.wsClient.emitToAll('sync_data', {
      table: 'pasajeros',
      action: 'INSERT',
      data: dto,
      vectorClock: {}, // Lo puedes generar si es necesario
      nodoOrigen: process.env.NODE_ID,
    });

    return creado;
  }

  async update(pasaporte: number, dto: UpdatePasajeroDto) {
    await this.pasajeroModel.updateOne({ Pasaporte: pasaporte }, { $set: dto });

    this.wsClient.emitToAll('sync_data', {
      table: 'pasajeros',
      action: 'UPDATE',
      data: { ...dto, Pasaporte: pasaporte },
      vectorClock: {}, // Lo puedes generar si es necesario
      nodoOrigen: process.env.NODE_ID,
    });

    return this.findOne(pasaporte);
  }
}
