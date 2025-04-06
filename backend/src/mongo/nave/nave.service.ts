import { Injectable } from '@nestjs/common';
import { CreateNaveDto } from './dto/create-nave.dto';
import { UpdateNaveDto } from './dto/update-nave.dto';

@Injectable()
export class NaveService {
  create(createNaveDto: CreateNaveDto) {
    return 'This action adds a new nave';
  }

  findAll() {
    return `This action returns all nave`;
  }

  findOne(id: number) {
    return `This action returns a #${id} nave`;
  }

  update(id: number, updateNaveDto: UpdateNaveDto) {
    return `This action updates a #${id} nave`;
  }

  remove(id: number) {
    return `This action removes a #${id} nave`;
  }
}
