import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { MongoRootModule } from './mongo/mongo-root.module';
import { MysqlRootModule } from './mysql/mysql-root.module';

// Importa la sincronización condicionalmente:
import { SyncMysqlModule } from './sync/sync-mysql.module';
import { SyncMongoModule } from './sync/sync-mongo.module';

import * as dotenv from 'dotenv';
dotenv.config();

console.log('🧪 Tipo de base de datos:', process.env.DB_TYPE);

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    // Carga los módulos raíz según el tipo de base de datos:
    ...(process.env.DB_TYPE === 'mongodb' ? [MongoRootModule] : [MysqlRootModule]),
    // Carga el módulo de sincronización correspondiente:
    ...(process.env.DB_TYPE === 'mongodb' ? [SyncMongoModule] : [SyncMysqlModule]),
  ],
})
export class AppModule {}
