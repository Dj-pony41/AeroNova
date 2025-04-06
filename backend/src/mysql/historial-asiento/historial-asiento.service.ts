import { Injectable } from '@nestjs/common';
import { CreateHistorialAsientoDto } from './dto/create-historial-asiento.dto';
import { UpdateHistorialAsientoDto } from './dto/update-historial-asiento.dto';

@Injectable()
export class HistorialAsientoService {
  create(createHistorialAsientoDto: CreateHistorialAsientoDto) {
    return 'This action adds a new historialAsiento';
  }

  findAll() {
    return `This action returns all historialAsiento`;
  }

  findOne(id: number) {
    return `This action returns a #${id} historialAsiento`;
  }

  update(id: number, updateHistorialAsientoDto: UpdateHistorialAsientoDto) {
    return `This action updates a #${id} historialAsiento`;
  }

  remove(id: number) {
    return `This action removes a #${id} historialAsiento`;
  }
}
