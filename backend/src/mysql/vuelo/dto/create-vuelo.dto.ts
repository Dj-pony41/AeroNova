import { IsInt, IsString, IsBoolean, IsNotEmpty, Length } from 'class-validator';

export class CreateVueloDto {
  @IsInt()
  @IsNotEmpty()
  fechaHoraSalida: number; // Timestamp

  @IsInt()
  @IsNotEmpty()
  fechaHoraLlegada: number; // Timestamp

  @IsString()
  @IsNotEmpty()
  @Length(3, 10)
  codigoVuelo: string;

  @IsBoolean()
  esInternacional: boolean;

  @IsInt()
  @IsNotEmpty()
  rutaId: number; // ID de la Ruta

  @IsInt()
  @IsNotEmpty()
  naveId: number; // ID de la Nave
}