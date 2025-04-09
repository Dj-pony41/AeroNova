// src/mongo/pasajero/pasajero.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MongoPasajero, PasajeroSchema } from './entities/pasajero.entity';
import { PasajeroService } from './pasajero.service';
import { PasajeroController } from './pasajero.controller';
import { WebSocketClient } from 'src/sync/websocket.client';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: MongoPasajero.name, schema: PasajeroSchema }]),
  ],
  providers: [PasajeroService, WebSocketClient],
  controllers: [PasajeroController],
  exports: [PasajeroService],
})
export class PasajeroModule {}
