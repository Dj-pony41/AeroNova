// create-pasajero.dto.ts
import { IsInt, IsString } from 'class-validator';

export class CreatePasajeroDto {
  @IsInt()
  Pasaporte: number;

  @IsString()
  NombreCompleto: string;
}
