// src/mongo/ruta/dto/create-ruta.dto.ts
import { IsNumber, IsInt, IsNotEmpty } from 'class-validator';

export class CreateRutaDto {
  @IsNumber({ maxDecimalPlaces: 2 })
  @IsNotEmpty()
  costoEjecutiva: number;

  @IsNumber({ maxDecimalPlaces: 2 })
  @IsNotEmpty()
  costoTuristica: number;

  @IsInt()
  @IsNotEmpty()
  origenId: number;

  @IsInt()
  @IsNotEmpty()
  destinoId: number;
}