import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { AsientoService } from './asiento.service';
import { CreateAsientoDto } from './dto/create-asiento.dto';
import { UpdateAsientoDto } from './dto/update-asiento.dto';

@Controller('asientos')
export class AsientoController {
  constructor(private readonly asientoService: AsientoService) {}

  @Post()
  async create(@Body() createAsientoDto: CreateAsientoDto) {
    return this.asientoService.createOrUpdate(createAsientoDto);
  }

  @Get()
  async findAll() {
    return this.asientoService.findAll();
  }

  @Put(':id')
async update(@Param('id') id: number, @Body() dto: UpdateAsientoDto) {
  return this.asientoService.update(id, dto);
}

}
