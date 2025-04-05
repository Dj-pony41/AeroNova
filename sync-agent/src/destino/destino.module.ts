import { Module } from '@nestjs/common';
import { DestinoService } from './destino.service';
import { DestinoController } from './destino.controller';

@Module({
  controllers: [DestinoController],
  providers: [DestinoService],
})
export class DestinoModule {}
