import { Injectable } from '@nestjs/common';
import { CreateDestinoDto } from './dto/create-destino.dto';
import { UpdateDestinoDto } from './dto/update-destino.dto';

@Injectable()
export class DestinoService {
  create(createDestinoDto: CreateDestinoDto) {
    return 'This action adds a new destino';
  }

  findAll() {
    return `This action returns all destino`;
  }

  findOne(id: number) {
    return `This action returns a #${id} destino`;
  }

  update(id: number, updateDestinoDto: UpdateDestinoDto) {
    return `This action updates a #${id} destino`;
  }

  remove(id: number) {
    return `This action removes a #${id} destino`;
  }
}
