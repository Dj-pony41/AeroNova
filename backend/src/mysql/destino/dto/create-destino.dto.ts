import { IsString, IsNotEmpty, Length, Matches } from 'class-validator';

export class CreateDestinoDto {
  @IsString()
  @IsNotEmpty()
  @Length(1, 100)
  ciudad: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 100)
  pais: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 150)
  aeropuerto: string;

  @IsString()
  @IsNotEmpty()
  @Length(3, 3)
  @Matches(/^[A-Z]{3}$/, { message: 'El código IATA debe tener 3 letras mayúsculas (ej. "MEX")' })
  codigoIATA: string;
}