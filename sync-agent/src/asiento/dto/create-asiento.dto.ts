import { IsInt, IsString, IsIn, IsOptional, IsNotEmpty } from 'class-validator';

export class CreateAsientoDto {
  @IsInt()
  @IsNotEmpty()
  idAsiento: number;

  @IsInt()
  @IsNotEmpty()
  vueloId: number; // ID del Vuelo

  @IsString()
  @IsNotEmpty()
  numeroAsiento: string;

  @IsString()
  @IsIn(['Ejecutiva', 'Turistica'])
  clase: string;

  @IsString()
  @IsIn(['Libre', 'Reservado', 'Vendido', 'Devolucion'])
  estado: string;

  @IsOptional()
  @IsInt()
  ultimaActualizacion?: number;

  @IsOptional()
  @IsString()
  vectorClock?: string;
}