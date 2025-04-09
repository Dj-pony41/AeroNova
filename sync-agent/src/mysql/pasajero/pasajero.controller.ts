import { Controller, Get, Param, Put, Body, ParseIntPipe } from '@nestjs/common';
import { PasajeroService } from './pasajero.service';
import { CreatePasajeroDto } from './dto/create-pasajero.dto';

@Controller('pasajeros')
export class PasajeroController {
  constructor(private readonly pasajeroService: PasajeroService) {}

  @Get()
  findAll() {
    return this.pasajeroService.findAll();
  }

  @Get(':pasaporte')
  findOne(@Param('pasaporte', ParseIntPipe) pasaporte: number) {
    return this.pasajeroService.findByPasaporte(pasaporte);
  }

  @Put(':pasaporte')
  async upsert(
    @Param('pasaporte', ParseIntPipe) pasaporte: number,
    @Body() dto: CreatePasajeroDto,
  ) {
    const pasajero = await this.pasajeroService.upsert(pasaporte, dto);
    return {
      message: '✅ Pasajero insertado/actualizado y sincronizado.',
      data: pasajero,
    };
  }
}
