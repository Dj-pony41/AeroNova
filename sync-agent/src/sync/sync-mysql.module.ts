import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SyncGateway } from './sync/sync.gateway';
import { SyncMysqlService } from './sync/sync-mysql.service';
import { Asiento as MySQLAsiento } from '../mysql/asiento/entities/asiento.entity';
import { SyncMongoModule } from './sync-mongo/sync-mongo.module';

@Module({
  imports: [TypeOrmModule.forFeature([MySQLAsiento]), SyncMongoModule],
  providers: [SyncGateway, SyncMysqlService],
  exports: [SyncGateway, SyncMysqlService],
})
export class SyncMysqlModule {}
