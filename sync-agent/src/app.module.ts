import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { SyncModule } from './sync/sync.module';
import { MongoRootModule } from './mongo/mongo-root.module';
import { MysqlRootModule } from './mysql/mysql-root.module';

console.log('🧪 Tipo de base de datos:', process.env.DB_TYPE);

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),

    ...(process.env.DB_TYPE === 'mongodb'
      ? [MongoRootModule]
      : [MysqlRootModule]),

    SyncModule,
  ],
})
export class AppModule {}
