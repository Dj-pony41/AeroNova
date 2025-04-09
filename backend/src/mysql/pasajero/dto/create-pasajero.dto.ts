import { IsInt, IsString, IsNotEmpty } from 'class-validator';

export class CreatePasajeroDto {
  @IsInt()
  pasaporte: number;

  @IsString()
  @IsNotEmpty()
  nombreCompleto: string;
}