import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TransaccionService } from './transaccion.service';
import { TransaccionController } from './transaccion.controller';
import { MongoTransaccion, TransaccionSchema } from './entities/transaccion.entity';
import { WebSocketClient } from 'src/sync/websocket.client';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: MongoTransaccion.name, schema: TransaccionSchema }
    ])
  ],
  controllers: [TransaccionController],
  providers: [TransaccionService, WebSocketClient],
  exports: [TransaccionService], // 👈 Asegúrate de exportarlo
})
export class TransaccionModule {}
