import { Module } from '@nestjs/common';
import { PasajeroService } from './pasajero.service';
import { PasajeroController } from './pasajero.controller';

@Module({
  controllers: [PasajeroController],
  providers: [PasajeroService],
})
export class PasajeroModule {}
