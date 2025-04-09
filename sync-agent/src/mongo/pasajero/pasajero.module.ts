import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PasajeroController } from './pasajero.controller';
import { PasajeroService } from './pasajero.service';
import { MongoPasajero, PasajeroSchema } from './entities/pasajero.entity';
import { WebSocketClient } from 'src/sync/websocket.client';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: MongoPasajero.name, schema: PasajeroSchema, collection: 'pasajeros' },
    ]),
  ],
  controllers: [PasajeroController],
  providers: [PasajeroService, WebSocketClient],
  exports: [PasajeroService],
})
export class PasajeroModule {}
