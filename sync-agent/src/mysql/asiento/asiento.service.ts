import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Asiento } from './entities/asiento.entity';
import { CreateAsientoDto } from './dto/create-asiento.dto';
import { UpdateAsientoDto } from './dto/update-asiento.dto';
import { WebSocketClient } from '../../sync/websocket.client';

import { appendTimezoneToEpoch } from 'src/common/utils/time.util';

@Injectable()
export class AsientoService {
  constructor(
    @InjectRepository(Asiento)
    private asientoRepo: Repository<Asiento>,
    private wsClient: WebSocketClient
  ) {}

  async findAll(): Promise<Asiento[]> {
    return this.asientoRepo.find();
  }

  async createOrUpdate(dto: CreateAsientoDto): Promise<Asiento> {
    // 1. Obtener asiento actual (si existe)
    const existing = await this.asientoRepo.findOne({ where: { idAsiento: dto.idAsiento } });

    // 2. Construir reloj vectorial actualizado
    const localNode = process.env.NODE_ID || 'nodo1';
    const newClock = existing?.vectorClock || { nodo1: 0, nodo2: 0, nodo3: 0 };
    newClock[localNode] = (newClock[localNode] || 0) + 1;

    // 3. Crear/actualizar entidad
    const asiento = this.asientoRepo.create({
      ...dto,
      vectorClock: newClock,
      ultimaActualizacion: Date.now(),
    });

    await this.asientoRepo.save(asiento);

    // 4. Enviar a los demás nodos
    this.wsClient.emitToAll('sync_data', {
      table: 'asientos',
      action: existing ? 'UPDATE' : 'INSERT',
      data: asiento,
      vectorClock: newClock,
      nodoOrigen: localNode,
    });

    return asiento;
  }

  async update(id: number, dto: UpdateAsientoDto) {
    const asiento = await this.asientoRepo.findOneBy({ idAsiento: id });
    if (!asiento) {
      throw new NotFoundException(`Asiento ${id} no encontrado`);
    }
  
    const zonaHoraria = Number(process.env.TIMEZONE_OFFSET || 0);
  
    const data = {
      ...asiento,
      ...dto,
      ultimaActualizacion: appendTimezoneToEpoch(
        dto.ultimaActualizacion ?? Date.now(),
        zonaHoraria
      ),
    };
  
    await this.asientoRepo.update({ idAsiento: id }, data);
    return data;
  }

  async updateAsiento(id: number, dto: UpdateAsientoDto): Promise<any> {
    const asiento = await this.asientoRepo.findOne({ where: { idAsiento: id } });
    if (!asiento) throw new Error(`Asiento con id ${id} no encontrado`);
  
    const currentNode = process.env.NODE_ID!;
    const baseClock = asiento.vectorClock || {
      nodo_mysql_1: 0,
      nodo_mysql_2: 0,
      nodo_mongo: 0,
    };
  
    const updatedClock = {
      ...baseClock,
      [currentNode]: (baseClock[currentNode] || 0) + 1,
    };
  
    await this.asientoRepo.update(id, {
      ...dto,
      vectorClock: updatedClock,
      ultimaActualizacion: dto.ultimaActualizacion ?? Date.now(),
    });
  
    return {
      ...asiento,
      ...dto,
      vectorClock: updatedClock,
    };
  }
  
  
}
