// src/mysql/asiento/asiento.controller.ts
import { Controller, Put, Param, Body } from '@nestjs/common';
import { SyncMysqlService } from 'src/sync/sync/sync-mysql.service';
import { UpdateAsientoDto } from './dto/update-asiento.dto'; // este ya lo tienes
import { WebSocketClient } from 'src/sync/websocket.client';

@Controller('asientos')
export class AsientoController {
  constructor(
    private readonly syncService: SyncMysqlService,
    private readonly wsClient: WebSocketClient,
  ) {}

  @Put(':id')
  async updateAsiento(
    @Param('id') id: number,
    @Body() dto: UpdateAsientoDto,
  ) {
    const payload = {
      table: 'asientos',
      action: 'UPDATE',
      data: {
        ...dto,
        idAsiento: id,
      },
      vectorClock: dto.vectorClock || { nodo_mysql_1: 1, nodo_mysql_2: 0, nodo_mongo: 0 },
      nodoOrigen: process.env.NODE_ID,
    };

    await this.syncService.handleSync(payload);
    this.wsClient.emitToAll('sync_data', payload);
    return { message: 'Asiento actualizado y sincronizado con otros nodos' };
  }
}
