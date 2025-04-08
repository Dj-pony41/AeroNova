import { Controller, Post, Get, Body } from '@nestjs/common';
import { AsientoService } from './asiento.service';
import { CreateAsientoDto } from './dto/create-asiento.dto';

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
}
