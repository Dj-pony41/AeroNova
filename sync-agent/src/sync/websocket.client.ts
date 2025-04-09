// src/sync/websocket.client.ts
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import io from 'socket.io-client';
@Injectable()
export class WebSocketClient implements OnModuleInit {
  private readonly logger = new Logger(WebSocketClient.name);
  private sockets: Map<string, any> = new Map();

  onModuleInit() {
    const otherNodes = (process.env.OTHER_NODES || '').split(',');

    for (const url of otherNodes) {
      const socket = io(url.trim(), {
        reconnection: true,
        reconnectionDelay: 5000,
        transports: ['websocket'],
      });

      socket.on('connect', () => {
        this.logger.log(`✅ Conectado con ${url}`);
        socket.emit('ping', { nodeId: process.env.NODE_ID });
      });

      socket.on('pong', (data: any) => {
        this.logger.log(`📨 Pong recibido de ${data.from}`);
      });

      socket.on('connect_error', (err: any) => {
        this.logger.warn(`❌ Error al conectar con ${url}: ${err.message}`);
      });

      this.sockets.set(url, socket);
    }
  }

  emitToAll(event: string, payload: any) {
    for (const [url, socket] of this.sockets.entries()) {
      socket.emit(event, payload);
      console.log(`➡️ Emitido a ${url}`);
    }
  }
  
}
