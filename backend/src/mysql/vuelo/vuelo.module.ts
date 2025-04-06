import { Module } from '@nestjs/common';
import { VueloService } from './vuelo.service';
import { VueloController } from './vuelo.controller';

@Module({
  controllers: [VueloController],
  providers: [VueloService],
})
export class VueloModule {}
