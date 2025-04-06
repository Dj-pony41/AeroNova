import { Module } from '@nestjs/common';
import { SyncGateway } from './sync/sync.gateway';
import { SyncService } from './sync/sync.service';

@Module({
  providers: [SyncGateway, SyncService]
})
export class SyncModule {}
