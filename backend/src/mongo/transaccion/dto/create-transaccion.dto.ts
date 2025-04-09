import { IsInt, IsString, IsIn, IsNotEmpty, IsOptional, IsObject, ValidateNested } from 'class-validator';

export class CreateTransaccionDto {
  @IsInt()
  @IsNotEmpty()
  idTransaccion: number;

  @IsInt()
  @IsNotEmpty()
  asientoId: number; // ID del Asiento

  @IsInt()
  @IsNotEmpty()
  pasaporte: number; // ID del Pasajero

  @IsString()
  @IsIn(['Reserva', 'Venta', 'Anulacion', 'Devolucion'])
  operacion: string;

  @IsInt()
  @IsNotEmpty()
  fechaOperacion: number; // Timestamp

  @IsString()
  @IsNotEmpty()
  origenTransaccion: string;

  @IsOptional()
  @IsObject()
  @ValidateNested() // Si usas class-validator
  vectorClock?: Record<string, number>;

  @IsInt()
  servidorConectado?: number;
}