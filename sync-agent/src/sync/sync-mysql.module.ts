// src/sync/sync-mysql.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SyncGateway } from './sync/sync.gateway';
import { SyncMysqlService } from './sync/sync-mysql.service';
import { Asiento as MySQLAsiento } from '../mysql/asiento/entities/asiento.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MySQLAsiento])],
  providers: [SyncGateway, SyncMysqlService],
  exports: [SyncGateway, SyncMysqlService],
})
export class SyncMysqlModule {}
