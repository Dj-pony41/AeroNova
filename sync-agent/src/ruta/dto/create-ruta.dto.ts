import { IsInt, IsDecimal, IsNotEmpty } from 'class-validator';

export class CreateRutaDto {
  @IsDecimal({ decimal_digits: '2' })
  costoEjecutiva: number;

  @IsDecimal({ decimal_digits: '2' })
  costoTuristica: number;

  @IsInt()
  @IsNotEmpty()
  origenId: number; // ID del Destino (origen)

  @IsInt()
  @IsNotEmpty()
  destinoId: number; // ID del Destino (destino)
}