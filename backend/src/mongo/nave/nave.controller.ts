import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { NaveService } from './nave.service';
import { CreateNaveDto } from './dto/create-nave.dto';
import { UpdateNaveDto } from './dto/update-nave.dto';

@Controller('nave')
export class NaveController {
  constructor(private readonly naveService: NaveService) {}

  @Post()
  create(@Body() createNaveDto: CreateNaveDto) {
    return this.naveService.create(createNaveDto);
  }

  @Get()
  findAll() {
    return this.naveService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.naveService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNaveDto: UpdateNaveDto) {
    return this.naveService.update(+id, updateNaveDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.naveService.remove(+id);
  }
}
