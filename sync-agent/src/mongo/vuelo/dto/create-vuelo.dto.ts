// src/mongo/vuelo/dto/create-vuelo.dto.ts
import { IsInt, IsString, IsBoolean, IsNotEmpty, Length } from 'class-validator';

export class CreateVueloDto {
  @IsInt()
  @IsNotEmpty()
  fechaHoraSalida: number;

  @IsInt()
  @IsNotEmpty()
  fechaHoraLlegada: number;

  @IsString()
  @IsNotEmpty()
  @Length(3, 10)
  codigoVuelo: string;

  @IsBoolean()
  @IsNotEmpty()
  esInternacional: boolean;

  @IsInt()
  @IsNotEmpty()
  rutaId: number;

  @IsInt()
  @IsNotEmpty()
  naveId: number;
}