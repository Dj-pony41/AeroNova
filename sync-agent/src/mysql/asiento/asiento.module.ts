import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Asiento } from './entities/asiento.entity';
import { AsientoService } from './asiento.service';
import { AsientoController } from './asiento.controller';
import { WebSocketClient } from '../../sync/websocket.client';

@Module({
  imports: [TypeOrmModule.forFeature([Asiento])],
  controllers: [AsientoController],
  providers: [AsientoService, WebSocketClient],
})
export class AsientoModule {}
