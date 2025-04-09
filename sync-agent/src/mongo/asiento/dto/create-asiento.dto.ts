// src/mongo/asiento/dto/create-asiento.dto.ts
import { IsInt, IsString, IsIn, IsOptional, IsNotEmpty, IsObject, ValidateNested } from 'class-validator';

export class CreateAsientoDto {
  @IsInt()
  @IsNotEmpty()
  idAsiento: number;

  @IsInt()
  @IsNotEmpty()
  vueloId: number; // Referencia al vuelo (igual que MySQL)

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
  @IsObject()
  @ValidateNested() // Si usas class-validator
  vectorClock?: Record<string, number>;
}