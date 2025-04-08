import { Module } from '@nestjs/common';
import { SyncGateway } from './sync/sync.gateway';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MongooseModule } from '@nestjs/mongoose';
import { SyncMysqlService } from './sync/sync-mysql.service';

import { Asiento as MySQLAsiento } from '../mysql/asiento/entities/asiento.entity';

const isMySQL = process.env.DB_TYPE === 'mysql';

const imports = isMySQL
  ? [TypeOrmModule.forFeature([MySQLAsiento])]
  : [
      // ¡Este bloque se carga dinámicamente solo si Mongo!
      (() => {
        const { MongoAsiento, AsientoSchema } = require('../mongo/asiento/entities/asiento.entity');
        return MongooseModule.forFeature([{ name: MongoAsiento.name, schema: AsientoSchema }]);
      })(),
    ];

const providers = isMySQL
  ? [SyncGateway, SyncMysqlService]
  : [
      SyncGateway,
      // Se carga dinámicamente solo si Mongo
      (() => {
        const { SyncMongoService } = require('./sync-mongo.service');
        return SyncMongoService;
      })(),
    ];

@Module({
  imports,
  providers,
})
export class SyncModule {}
