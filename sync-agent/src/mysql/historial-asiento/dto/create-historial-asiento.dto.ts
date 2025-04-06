import { IsInt, IsString, IsNotEmpty } from 'class-validator';

export class CreateHistorialAsientoDto {
  @IsInt()
  @IsNotEmpty()
  asientoId: number; // ID del Asiento

  @IsString()
  @IsNotEmpty()
  estadoAnterior: string;

  @IsString()
  @IsNotEmpty()
  estadoNuevo: string;

  @IsInt()
  @IsNotEmpty()
  epochCambio: number;

  @IsInt()
  @IsNotEmpty()
  nodoOrigen: number;
}