import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PasajeroService } from './pasajero.service';
import { CreatePasajeroDto } from './dto/create-pasajero.dto';
import { UpdatePasajeroDto } from './dto/update-pasajero.dto';

@Controller('pasajero')
export class PasajeroController {
  constructor(private readonly pasajeroService: PasajeroService) {}

  @Post()
  create(@Body() createPasajeroDto: CreatePasajeroDto) {
    return this.pasajeroService.create(createPasajeroDto);
  }

  @Get()
  findAll() {
    return this.pasajeroService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pasajeroService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePasajeroDto: UpdatePasajeroDto) {
    return this.pasajeroService.update(+id, updatePasajeroDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pasajeroService.remove(+id);
  }
}
