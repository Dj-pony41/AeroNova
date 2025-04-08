import { Module } from '@nestjs/common';
import { SyncGateway } from './sync/sync.gateway';
import { SyncMysqlService } from './sync/sync-mysql.service';
import { SyncMongoService } from './sync/sync-mongo.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Asiento } from '../../src/mysql/asiento/entities/asiento.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { MongoAsiento, AsientoSchema } from '../../src/mongo/asiento/entities/asiento.entity';

const dbType = process.env.DB_TYPE;

@Module({
  imports: [
    ...(dbType === 'mysql'
      ? [TypeOrmModule.forFeature([Asiento])]
      : [MongooseModule.forFeature([{ name: MongoAsiento.name, schema: AsientoSchema }])]),
  ],
  providers: [
    SyncGateway,
    ...(dbType === 'mysql' ? [SyncMysqlService] : [SyncMongoService]),
  ],
})
export class SyncModule {}
