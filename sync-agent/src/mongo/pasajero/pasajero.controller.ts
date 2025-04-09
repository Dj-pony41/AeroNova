// src/mongo/pasajero/pasajero.controller.ts
import { Controller, Get, Put, Param, ParseIntPipe, Body } from '@nestjs/common';
import { PasajeroService } from './pasajero.service';
import { UpdatePasajeroDto } from './dto/update-pasajero.dto';

@Controller('pasajero')
export class PasajeroController {
  constructor(private readonly pasajeroService: PasajeroService) {}

  @Get()
  async getAll() {
    return this.pasajeroService.findAll();
  }

  @Get(':pasaporte')
  async getOne(@Param('pasaporte', ParseIntPipe) pasaporte: number) {
    return this.pasajeroService.findByPasaporte(pasaporte);
  }

  @Put(':pasaporte')
  async updateOrInsert(
    @Param('pasaporte', ParseIntPipe) pasaporte: number,
    @Body() dto: UpdatePasajeroDto,
  ) {
    return this.pasajeroService.createOrUpdate(pasaporte, dto);
  }
}
