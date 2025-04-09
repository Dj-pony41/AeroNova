// update-pasajero.dto.ts
import { IsOptional, IsInt, IsString } from 'class-validator';

export class UpdatePasajeroDto {
  @IsOptional()
  @IsInt()
  Pasaporte?: number;

  @IsOptional()
  @IsString()
  NombreCompleto?: string;
}
