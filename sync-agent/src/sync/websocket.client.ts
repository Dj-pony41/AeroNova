// src/sync/websocket.client.ts
import { Injectable } from '@nestjs/common';
import io from 'socket.io-client';

@Injectable()
export class WebSocketClient {
  public socket: any;
  private _isConnected = false;

  constructor() {
    this.connect();
  }

  public get isConnected(): boolean {
    return this._isConnected;
  }


  connect() {
    this.socket = io('http://otros-nodos:3001', {
      reconnection: true,
      reconnectionDelay: 5000,
    });

    this.socket.on('connect', () => {
      this._isConnected = true;
    });

    this.socket.on('disconnect', () => {
      this._isConnected = false;
    });
  }

  emit(event: string, payload: any) {
    if (this.isConnected) {
      this.socket.emit(event, payload);
    }
  }
}