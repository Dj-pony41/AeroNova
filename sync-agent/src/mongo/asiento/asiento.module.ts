import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AsientoController } from './asiento.controller';
import { AsientoService } from './asiento.service';
import { MongoAsiento, AsientoSchema } from './entities/asiento.entity';
import { WebSocketClient } from '../../sync/websocket.client';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: MongoAsiento.name, schema: AsientoSchema },
    ]),
  ],
  controllers: [AsientoController],
  providers: [AsientoService, WebSocketClient],
})
export class AsientoModule {}
