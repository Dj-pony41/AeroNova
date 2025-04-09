import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pasajero } from './entities/pasajero.entity';
import { CreatePasajeroDto } from './dto/create-pasajero.dto';
import { UpdatePasajeroDto } from './dto/update-pasajero.dto';

@Injectable()
export class PasajeroService {
  constructor(
    @InjectRepository(Pasajero)
    private readonly pasajeroRepo: Repository<Pasajero>,
  ) {}

  async findAll(): Promise<Pasajero[]> {
    return this.pasajeroRepo.find();
  }

  async findOne(pasaporte: number): Promise<Pasajero | null> {
    return await this.pasajeroRepo.findOneBy({ pasaporte });
  }

  async create(dto: CreatePasajeroDto): Promise<Pasajero> {
    const existe = await this.pasajeroRepo.findOneBy({ pasaporte: dto.pasaporte });
    if (existe) {
      throw new Error(`El pasajero con pasaporte ${dto.pasaporte} ya existe`);
    }

    const pasajero = this.pasajeroRepo.create(dto);
    return this.pasajeroRepo.save(pasajero);
  }

  async update(pasaporte: number, dto: UpdatePasajeroDto): Promise<Pasajero> {
    const pasajero = await this.pasajeroRepo.findOneBy({ pasaporte });

    if (!pasajero) {
      throw new NotFoundException(`Pasajero con pasaporte ${pasaporte} no encontrado`);
    }

    Object.assign(pasajero, dto);
    return this.pasajeroRepo.save(pasajero);
  }
}
