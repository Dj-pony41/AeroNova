import { Module } from '@nestjs/common';
import { NaveService } from './nave.service';
import { NaveController } from './nave.controller';

@Module({
  controllers: [NaveController],
  providers: [NaveService],
})
export class NaveModule {}
