import { Controller, Get, Post, Put, Body, Param, ParseIntPipe } from '@nestjs/common';
import { PasajeroService } from './pasajero.service';
import { CreatePasajeroDto } from './dto/create-pasajero.dto';
import { UpdatePasajeroDto } from './dto/update-pasajero.dto';

@Controller('pasajero')
export class PasajeroController {
  constructor(private readonly pasajeroService: PasajeroService) {}

  @Get()
  findAll() {
    return this.pasajeroService.findAll();
  }

  @Get(':pasaporte')
  findOne(@Param('pasaporte', ParseIntPipe) pasaporte: number) {
    return this.pasajeroService.findOne(pasaporte);
  }

  @Post()
  create(@Body() dto: CreatePasajeroDto) {
    return this.pasajeroService.create(dto);
  }

  @Put(':pasaporte')
  update(
    @Param('pasaporte', ParseIntPipe) pasaporte: number,
    @Body() dto: UpdatePasajeroDto,
  ) {
    return this.pasajeroService.update(pasaporte, dto);
  }
}
