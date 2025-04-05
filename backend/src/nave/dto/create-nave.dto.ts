import { IsString, IsInt, IsNotEmpty, IsDecimal } from 'class-validator';

export class CreateNaveDto {
  @IsString()
  @IsNotEmpty()
  tipo: string;

  @IsInt()
  capacidadEjecutiva: number;

  @IsInt()
  capacidadTuristica: number;

  @IsString()
  @IsNotEmpty()
  matricula: string;

  @IsInt()
  ultimoVuelo?: number;

  @IsDecimal({ decimal_digits: '2' })
  horasVueloTotal?: number;

  @IsInt()
  ciclosVuelo?: number;

  @IsDecimal({ decimal_digits: '2' })
  distanciaTotal?: number;
}