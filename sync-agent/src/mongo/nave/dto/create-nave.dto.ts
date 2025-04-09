// src/mongo/nave/dto/create-nave.dto.ts
import { IsString, IsInt, IsNotEmpty } from 'class-validator';

export class CreateNaveDto {
  @IsString()
  @IsNotEmpty()
  tipo: string;

  @IsInt()
  @IsNotEmpty()
  capacidadEjecutiva: number;

  @IsInt()
  @IsNotEmpty()
  capacidadTuristica: number;

  @IsString()
  @IsNotEmpty()
  matricula: string;

  @IsInt()
  ultimoVuelo?: number;

  horasVueloTotal?: number;

  @IsInt()
  ciclosVuelo?: number;

  distanciaTotal?: number;
}