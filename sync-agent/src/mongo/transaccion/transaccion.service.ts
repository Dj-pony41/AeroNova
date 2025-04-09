import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MongoTransaccion } from './entities/transaccion.entity';
import { CreateTransaccionDto } from './dto/create-transaccion.dto';
import { UpdateTransaccionDto } from './dto/update-transaccion.dto';

@Injectable()
export class TransaccionService {
  constructor(
    @InjectModel(MongoTransaccion.name)
    private readonly transaccionModel: Model<MongoTransaccion>,
  ) {}

  async create(dto: CreateTransaccionDto): Promise<MongoTransaccion> {
    return this.transaccionModel.create(dto);
  }

  async update(id: number, dto: UpdateTransaccionDto): Promise<MongoTransaccion | null> {
    return this.transaccionModel.findOneAndUpdate({ IdTransaccion: id }, dto, {
      new: true,
      upsert: true,
    });
  }

  async findAll(): Promise<MongoTransaccion[]> {
    return this.transaccionModel.find().lean();
  }

  async findOne(id: number): Promise<MongoTransaccion | null> {
    return this.transaccionModel.findOne({ IdTransaccion: id }).lean();
  }
}
