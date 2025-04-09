import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pasajero } from './entities/pasajero.entity';
import { PasajeroService } from './pasajero.service';
import { PasajeroController } from './pasajero.controller';
import { WebSocketClient } from 'src/sync/websocket.client';

@Module({
  imports: [TypeOrmModule.forFeature([Pasajero])],
  controllers: [PasajeroController],
  providers: [PasajeroService, WebSocketClient],
  exports: [PasajeroService],
})
export class PasajeroModule {}
