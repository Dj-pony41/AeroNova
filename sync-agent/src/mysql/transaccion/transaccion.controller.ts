// src/mysql/transaccion/transaccion.controller.ts
import {
  Controller, Post, Put, Get, Param, Body, ParseIntPipe,
} from '@nestjs/common';
import { TransaccionService } from './transaccion.service';
import { CreateTransaccionDto } from './dto/create-transaccion.dto';
import { UpdateTransaccionDto } from './dto/update-transaccion.dto';

@Controller('transacciones')
export class TransaccionController {
  constructor(private readonly service: TransaccionService) {}

  @Post()
  create(@Body() dto: CreateTransaccionDto) {
    return this.service.create(dto);
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateTransaccionDto) {
    return this.service.update(id, dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }
}
