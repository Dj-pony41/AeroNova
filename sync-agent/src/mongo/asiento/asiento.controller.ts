import { Controller, Get, Put, Param, Body } from '@nestjs/common';
import { AsientoService } from './asiento.service';
import { UpdateAsientoDto } from './dto/update-asiento.dto';

@Controller('asientos')
export class AsientoController {
  constructor(private readonly asientoService: AsientoService) {}

  @Get()
  async findAll() {
    return this.asientoService.findAll();
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() dto: UpdateAsientoDto) {
    return this.asientoService.createOrUpdate(+id, dto);
  }
}
