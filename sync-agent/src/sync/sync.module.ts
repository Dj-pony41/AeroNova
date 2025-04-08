import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MongooseModule } from '@nestjs/mongoose';
import { SyncGateway } from './sync/sync.gateway';

import { Asiento as MySQLAsiento } from '../mysql/asiento/entities/asiento.entity';

const isMySQL = process.env.DB_TYPE === 'mysql';

// Función que retorna el módulo de Mongoose solo si se necesita
function getMongoImports() {
  const { MongoAsiento, AsientoSchema } = require('../mongo/asiento/entities/asiento.entity');
  return MongooseModule.forFeature([{ name: MongoAsiento.name, schema: AsientoSchema }]);
}

// Función que retorna el servicio Mongo solo si se necesita
function getMongoProvider() {
  const { SyncMongoService } = require('./sync/sync-mongo.service');
  return SyncMongoService;
}

@Module({
  imports: [
    ...(isMySQL
      ? [TypeOrmModule.forFeature([MySQLAsiento])]
      : [getMongoImports()]),
  ],
  providers: [
    SyncGateway,
    ...(isMySQL ? [require('./sync/sync-mysql.service').SyncMysqlService] : [getMongoProvider()]),
  ],
})
export class SyncModule {}
