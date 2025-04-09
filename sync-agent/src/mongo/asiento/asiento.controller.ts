import { Controller, Get, Put, Param, Body } from '@nestjs/common';
import { AsientoService } from './asiento.service';
import { CreateAsientoDto } from './dto/create-asiento.dto';

@Controller('asientos')
export class AsientoController {
  constructor(private readonly asientoService: AsientoService) {}

  @Get()
  async findAll() {
    return this.asientoService.findAll();
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() dto: CreateAsientoDto) {
    return this.asientoService.createOrUpdate(+id, dto);
  }
}
