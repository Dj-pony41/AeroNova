// src/mongo/pasajero/dto/create-pasajero.dto.ts
import { IsInt, IsString, IsNotEmpty } from 'class-validator';

export class CreatePasajeroDto {
  @IsInt()
  @IsNotEmpty()
  pasaporte: number;

  @IsString()
  @IsNotEmpty()
  nombreCompleto: string;
}