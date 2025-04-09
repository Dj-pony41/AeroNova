import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Asiento } from './entities/asiento.entity';
import { AsientoService } from './asiento.service';
import { AsientoController } from './asiento.controller';
import { WebSocketClient } from '../../sync/websocket.client';
import { SyncMysqlService } from '../../sync/sync/sync-mysql.service';
import { SyncMysqlModule } from 'src/sync/sync-mysql.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Asiento]),
    SyncMysqlModule, // ✅ Importás lo necesario
  ],
  controllers: [AsientoController],
  providers: [AsientoService, WebSocketClient], // ✅ solo proveedores locales
})
export class AsientoModule {}
