import { Controller, Get, Param, ParseIntPipe, Put, Body, Post } from '@nestjs/common';
import { TransaccionService } from './transaccion.service';
import { CreateTransaccionDto } from './dto/create-transaccion.dto';
import { UpdateTransaccionDto } from './dto/update-transaccion.dto';

@Controller('transaccion')
export class TransaccionController {
  constructor(private readonly service: TransaccionService) {}

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  @Post()
  create(@Body() dto: CreateTransaccionDto) {
    return this.service.create(dto);
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateTransaccionDto) {
    return this.service.update(id, dto);
  }
}
