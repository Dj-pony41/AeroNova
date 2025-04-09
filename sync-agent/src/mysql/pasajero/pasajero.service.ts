import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pasajero } from './entities/pasajero.entity';
import { CreatePasajeroDto } from './dto/create-pasajero.dto';
import { UpdatePasajeroDto } from './dto/update-pasajero.dto';
import { WebSocketClient } from 'src/sync/websocket.client';

@Injectable()
export class PasajeroService {
  constructor(
    @InjectRepository(Pasajero)
    private readonly pasajeroRepo: Repository<Pasajero>,
    private readonly wsClient: WebSocketClient,
  ) {}

  async findAll() {
    return this.pasajeroRepo.find();
  }

  async findByPasaporte(pasaporte: number) {
    const pasajero = await this.pasajeroRepo.findOneBy({ pasaporte });
    if (!pasajero) {
      throw new NotFoundException(`Pasajero con pasaporte ${pasaporte} no encontrado`);
    }
    return pasajero;
  }

  async upsert(pasaporte: number, dto: CreatePasajeroDto): Promise<Pasajero> {
    const existing = await this.pasajeroRepo.findOneBy({ pasaporte });

    const pasajero = this.pasajeroRepo.create({ ...existing, ...dto });

    await this.pasajeroRepo.save(pasajero);

    this.wsClient.emitToAll('sync_data', {
      table: 'pasajeros',
      action: existing ? 'UPDATE' : 'INSERT',
      data: pasajero,
      vectorClock: {}, // No usamos vectorClock aquí
      nodoOrigen: process.env.NODE_ID,
    });

    return pasajero;
  }

  async syncUpsert(data: any) {
    await this.pasajeroRepo.save(data);
  }
}
