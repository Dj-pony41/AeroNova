// src/mysql/transaccion/dto/create-transaccion.ts
import {
  IsInt,
  IsNotEmpty,
  IsIn,
  IsString,
  IsObject,
} from 'class-validator';

export class CreateTransaccionDto {
  @IsInt()
  @IsNotEmpty()
  IdTransaccion: number;

  @IsInt()
  @IsNotEmpty()
  IdAsiento: number;

  @IsInt()
  @IsNotEmpty()
  Pasaporte: number;

  @IsIn(['Devolucion', 'Anulacion', 'Venta', 'Reserva'])
  @IsString()
  Operacion: 'Devolucion' | 'Anulacion' | 'Venta' | 'Reserva'; // ✅ Tipo literal

  @IsInt()
  FechaOperacion: number;

  @IsString()
  OrigenTransaccion: string;

  @IsObject()
  VectorClock: Record<string, number>;

  @IsInt()
  ServidorConectado: number;
}
