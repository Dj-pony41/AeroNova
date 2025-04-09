// src/mongo/historial-asiento/dto/create-historial-asiento.dto.ts
import { IsInt, IsString, IsNotEmpty, IsIn } from 'class-validator';

export class CreateHistorialAsientoDto {
  @IsInt()
  @IsNotEmpty()
  asientoId: number;

  @IsString()
  @IsNotEmpty()
  @IsIn(['Libre', 'Reservado', 'Vendido', 'Devolucion'])
  estadoAnterior: string;

  @IsString()
  @IsNotEmpty()
  @IsIn(['Libre', 'Reservado', 'Vendido', 'Devolucion'])
  estadoNuevo: string;

  @IsInt()
  @IsNotEmpty()
  epochCambio: number;

  @IsInt()
  @IsNotEmpty()
  nodoOrigen: number;
}