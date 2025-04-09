import { Controller, Get, Post, Put, Param, Body, ParseIntPipe, NotFoundException } from '@nestjs/common';
import { PasajeroService } from './pasajero.service';
import { CreatePasajeroDto } from './dto/create-pasajero.dto';
import { UpdatePasajeroDto } from './dto/update-pasajero.dto';
import { WebSocketClient } from 'src/sync/websocket.client';

@Controller('pasajero')
export class PasajeroController {
  constructor(
    private readonly pasajeroService: PasajeroService,
    private readonly wsClient: WebSocketClient,
  ) {}

  @Get()
  findAll() {
    return this.pasajeroService.findAll();
  }

  @Get(':pasaporte')
  async findOne(@Param('pasaporte', ParseIntPipe) pasaporte: number) {
    const pasajero = await this.pasajeroService.findOne(pasaporte);
    if (!pasajero) {
      throw new NotFoundException(`Pasajero con pasaporte ${pasaporte} no encontrado.`);
    }
    return pasajero;
  }

  @Post()
  async create(@Body() dto: CreatePasajeroDto) {
    const pasajero = await this.pasajeroService.create(dto);

    // Emitir sincronización
    this.wsClient.emitToAll('sync_data', {
      table: 'pasajeros',
      action: 'INSERT',
      data: dto,
      vectorClock: {}, // Puedes mejorar esto si decides usar relojes vectoriales en pasajero
      nodoOrigen: process.env.NODE_ID,
    });

    return {
      message: '✅ Pasajero creado y sincronizado',
      data: pasajero,
    };
  }

  @Put(':pasaporte')
  async update(
    @Param('pasaporte', ParseIntPipe) pasaporte: number,
    @Body() dto: UpdatePasajeroDto,
  ) {
    const pasajero = await this.pasajeroService.update(pasaporte, dto);

    // Emitir sincronización
    this.wsClient.emitToAll('sync_data', {
      table: 'pasajeros',
      action: 'UPDATE',
      data: { ...dto, pasaporte },
      vectorClock: {}, // Puedes mejorar esto si decides usar relojes vectoriales en pasajero
      nodoOrigen: process.env.NODE_ID,
    });

    return {
      message: '✏️ Pasajero actualizado y sincronizado',
      data: pasajero,
    };
  }
}
