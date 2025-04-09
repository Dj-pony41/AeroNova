import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SyncGateway } from './sync/sync.gateway';
import { SyncMysqlService } from './sync/sync-mysql.service';
import { Asiento as MySQLAsiento } from '../mysql/asiento/entities/asiento.entity';
import { WebSocketClient } from './websocket.client';
import { AsientoModule } from '../mysql/asiento/asiento.module';
import { PasajeroModule } from '../mysql/pasajero/pasajero.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([MySQLAsiento]),
    forwardRef(() => AsientoModule),
    
    PasajeroModule, // ✅ Rompe el ciclo
  ],
  providers: [SyncGateway, SyncMysqlService, WebSocketClient],
  exports: [SyncGateway, SyncMysqlService, WebSocketClient],
})
export class SyncMysqlModule {}
