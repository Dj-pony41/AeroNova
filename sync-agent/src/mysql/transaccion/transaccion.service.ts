// src/mysql/transaccion/transaccion.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Transaccion } from './entities/transaccion.entity';
import { Repository } from 'typeorm';
import { CreateTransaccionDto } from './dto/create-transaccion.dto';
import { UpdateTransaccionDto } from './dto/update-transaccion.dto';

@Injectable()
export class TransaccionService {
  constructor(
    @InjectRepository(Transaccion)
    private repo: Repository<Transaccion>,
  ) {}

  async create(dto: CreateTransaccionDto): Promise<Transaccion> {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: number, dto: UpdateTransaccionDto): Promise<Transaccion> {
    const transaccion = await this.repo.findOne({ where: { IdTransaccion: id } });
    if (!transaccion) throw new NotFoundException(`Transacción ${id} no encontrada`);

    Object.assign(transaccion, dto);
    return this.repo.save(transaccion);
  }

  async findAll(): Promise<Transaccion[]> {
    return this.repo.find();
  }

  async findOne(id: number): Promise<Transaccion> {
    const transaccion = await this.repo.findOne({ where: { IdTransaccion: id } });
    if (!transaccion) throw new NotFoundException(`Transacción ${id} no encontrada`);
    return transaccion;
  }
}
