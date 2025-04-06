// src/sync/sync.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MongooseModule } from '@nestjs/mongoose';
import { Asiento } from '../mysql/asiento/entities/asiento.entity';
import { MongoAsiento, AsientoSchema } from '../mongo/asiento/entities/asiento.entity';
import { SyncGateway } from './sync/sync.gateway';
import { SyncService } from './sync/sync.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Asiento]), // Entidad MySQL
    MongooseModule.forFeature([{ name: MongoAsiento.name, schema: AsientoSchema }]), // Entidad MongoDB
  ],
  providers: [SyncGateway, SyncService],
})
export class SyncModule {}