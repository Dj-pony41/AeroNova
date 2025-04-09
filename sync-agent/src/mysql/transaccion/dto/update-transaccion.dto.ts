// src/mysql/transaccion/dto/update-transaccion.ts
import {
    IsOptional,
    IsInt,
    IsString,
    IsIn,
    IsObject,
  } from 'class-validator';
  
  export class UpdateTransaccionDto {
    @IsOptional()
    @IsInt()
    IdAsiento?: number;
  
    @IsOptional()
    @IsInt()
    Pasaporte?: number;
  
    @IsOptional()
    @IsIn(['Devolucion', 'Anulacion', 'Venta', 'Reserva'])
    Operacion?: string;
  
    @IsOptional()
    @IsInt()
    FechaOperacion?: number;
  
    @IsOptional()
    @IsString()
    OrigenTransaccion?: string;
  
    @IsOptional()
    @IsObject()
    VectorClock?: Record<string, number>;
  
    @IsOptional()
    @IsInt()
    ServidorConectado?: number;
  }
  