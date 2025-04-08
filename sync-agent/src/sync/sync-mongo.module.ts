// src/sync/sync-mongo.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SyncGateway } from './sync/sync.gateway';
import { SyncMongoService } from './sync/sync-mongo.service';
import { MongoAsiento, AsientoSchema } from '../mongo/asiento/entities/asiento.entity';

@Module({
  imports: [MongooseModule.forFeature([{ name: MongoAsiento.name, schema: AsientoSchema }])],
  providers: [SyncGateway, SyncMongoService],
  exports: [SyncGateway, SyncMongoService],
})
export class SyncMongoModule {}
