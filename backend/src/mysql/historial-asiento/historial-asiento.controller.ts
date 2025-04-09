import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { HistorialAsientoService } from './historial-asiento.service';
import { CreateHistorialAsientoDto } from './dto/create-historial-asiento.dto';
import { UpdateHistorialAsientoDto } from './dto/update-historial-asiento.dto';

@Controller('historial-asiento')
export class HistorialAsientoController {
  constructor(private readonly historialAsientoService: HistorialAsientoService) {}

  @Post()
  create(@Body() createHistorialAsientoDto: CreateHistorialAsientoDto) {
    return this.historialAsientoService.create(createHistorialAsientoDto);
  }

  @Get()
  findAll() {
    return this.historialAsientoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.historialAsientoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHistorialAsientoDto: UpdateHistorialAsientoDto) {
    return this.historialAsientoService.update(+id, updateHistorialAsientoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.historialAsientoService.remove(+id);
  }
}
