import {
  IsInt,
  IsString,
  IsIn,
  IsObject,
  IsNotEmpty,
} from 'class-validator';

export class CreateTransaccionDto {
  @IsInt()
  IdTransaccion: number;

  @IsInt()
  IdAsiento: number;

  @IsInt()
  Pasaporte: number;

  @IsString()
  @IsIn(['Devolucion', 'Anulacion', 'Venta', 'Reserva'])
  Operacion: string;

  @IsInt()
  FechaOperacion: number;

  @IsString()
  OrigenTransaccion: string;

  @IsObject()
  VectorClock: Record<string, number>;

  @IsInt()
  ServidorConectado: number;
}
