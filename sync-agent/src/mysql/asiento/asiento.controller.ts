// src/mysql/asiento/asiento.controller.ts
import { Controller, Put, Param, Body, ParseIntPipe } from '@nestjs/common';
import { SyncMysqlService } from 'src/sync/sync/sync-mysql.service';
import { UpdateAsientoDto } from './dto/update-asiento.dto';
import { WebSocketClient } from 'src/sync/websocket.client';

@Controller('asientos')
export class AsientoController {
  constructor(
    private readonly syncService: SyncMysqlService,
    private readonly wsClient: WebSocketClient,
  ) {}

  @Put(':id')
  async updateAsiento(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateAsientoDto,
  ) {
    const currentNode = process.env.NODE_ID!;
    const baseClock = dto.vectorClock || {
      nodo_mysql_1: 0,
      nodo_mysql_2: 0,
      nodo_mongo: 0,
    };

    const updatedClock = {
      ...baseClock,
      [currentNode]: (baseClock[currentNode] || 0) + 1,
    };

    const finalData = {
      ...dto,
      idAsiento: id,
      ultimaActualizacion: dto.ultimaActualizacion ?? Date.now(), // epoch actual si no se manda
      vectorClock: updatedClock,
    };

    const payload: {
      table: string;
      action: 'UPDATE' | 'INSERT' | 'DELETE';
      data: any;
      vectorClock: Record<string, number>;
      nodoOrigen: string;
    } = {
      table: 'asientos',
      action: 'UPDATE',
      data: finalData,
      vectorClock: updatedClock,
      nodoOrigen: currentNode,
    };
    

    await this.syncService.handleSync(payload);
    this.wsClient.emitToAll('sync_data', payload);

    return {
      message: `✅ Asiento ${id} actualizado en ${currentNode} y sincronizado con los nodos.`,
      data: finalData,
    };
  }
}
