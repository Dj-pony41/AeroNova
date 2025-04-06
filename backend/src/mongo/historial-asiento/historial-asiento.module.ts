import { Module } from '@nestjs/common';
import { HistorialAsientoService } from './historial-asiento.service';
import { HistorialAsientoController } from './historial-asiento.controller';

@Module({
  controllers: [HistorialAsientoController],
  providers: [HistorialAsientoService],
})
export class HistorialAsientoModule {}
