// src/mongo/asiento/asiento.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MongoAsiento, AsientoSchema } from './entities/asiento.entity';
import { AsientoService } from './asiento.service';
import { AsientoController } from './asiento.controller';
import { WebSocketClient } from '../../sync/websocket.client';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: MongoAsiento.name, schema: AsientoSchema }])
  ],
  controllers: [AsientoController],
  providers: [AsientoService, WebSocketClient],
  exports: [AsientoService], // ✅ EXPORTA el servicio para que SyncMongoModule lo use
})
export class AsientoModule {}
