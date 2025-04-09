// src/mongo/pasajero/dto/update-pasajero.dto.ts
import { IsInt, IsOptional, IsString } from 'class-validator';

export class UpdatePasajeroDto {
  @IsOptional()
  @IsInt()
  pasaporte?: number;

  @IsOptional()
  @IsString()
  nombreCompleto?: string;
}
