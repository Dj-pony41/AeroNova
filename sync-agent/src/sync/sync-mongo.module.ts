// src/sync/sync-mongo.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SyncGateway } from './sync/sync.gateway';
import { SyncMongoService } from './sync/sync-mongo.service';
import { MongoAsiento, AsientoSchema } from '../mongo/asiento/entities/asiento.entity';
import { AsientoModule } from '../mongo/asiento/asiento.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: MongoAsiento.name, schema: AsientoSchema }]),
    AsientoModule, // ✅ AÑADE ESTO
  ],
  providers: [SyncGateway, SyncMongoService],
  exports: [SyncGateway, SyncMongoService],
})
export class SyncMongoModule {}
