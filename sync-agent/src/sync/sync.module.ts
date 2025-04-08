import { Module } from '@nestjs/common';
import { SyncGateway } from './sync/sync.gateway';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MongooseModule } from '@nestjs/mongoose';

import { SyncMysqlService } from './sync/sync-mysql.service';
import { SyncMongoService } from './sync/sync-mongo.service';

import { Asiento as MySQLAsiento } from '../mysql/asiento/entities/asiento.entity';
import { MongoAsiento, AsientoSchema } from '../mongo/asiento/entities/asiento.entity';

const isMySQL = process.env.DB_TYPE === 'mysql';

@Module({
  imports: [
    ...(isMySQL
      ? [TypeOrmModule.forFeature([MySQLAsiento])]
      : [MongooseModule.forFeature([{ name: MongoAsiento.name, schema: AsientoSchema }])]),
  ],
  providers: [
    SyncGateway,
    ...(isMySQL ? [SyncMysqlService] : [SyncMongoService]),
  ],
})
export class SyncModule {}
