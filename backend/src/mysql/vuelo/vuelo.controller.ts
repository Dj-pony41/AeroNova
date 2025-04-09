import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { VueloService } from './vuelo.service';
import { CreateVueloDto } from './dto/create-vuelo.dto';
import { UpdateVueloDto } from './dto/update-vuelo.dto';

@Controller('vuelo')
export class VueloController {
  constructor(private readonly vueloService: VueloService) {}

  @Post()
  create(@Body() createVueloDto: CreateVueloDto) {
    return this.vueloService.create(createVueloDto);
  }

  @Get()
  findAll() {
    return this.vueloService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.vueloService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVueloDto: UpdateVueloDto) {
    return this.vueloService.update(+id, updateVueloDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.vueloService.remove(+id);
  }
}
