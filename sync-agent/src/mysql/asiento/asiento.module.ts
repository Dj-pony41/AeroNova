import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Asiento } from './entities/asiento.entity';
import { AsientoService } from './asiento.service';
import { AsientoController } from './asiento.controller';
import { WebSocketClient } from '../../sync/websocket.client';
import { SyncMysqlModule } from 'src/sync/sync-mysql.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Asiento]),
    forwardRef(() => SyncMysqlModule), // ✅ Rompe el ciclo
  ],
  controllers: [AsientoController],
  providers: [AsientoService, WebSocketClient],
  exports: [AsientoService],
})
export class AsientoModule {}
