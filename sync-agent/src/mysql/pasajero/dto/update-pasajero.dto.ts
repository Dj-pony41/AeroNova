import { IsString, IsOptional } from 'class-validator';

export class UpdatePasajeroDto {
  @IsOptional()
  @IsString()
  nombreCompleto?: string;
}
