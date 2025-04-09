import {
    IsInt,
    IsOptional,
    IsString,
    IsIn,
    IsObject,
    IsNotEmpty,
  } from 'class-validator';
  
  export class UpdateAsientoDto {
    @IsOptional()
    @IsInt()
    idVuelo?: number;
  
    @IsOptional()
    @IsString()
    numeroAsiento?: string;
  
    @IsOptional()
    @IsIn(['Ejecutiva', 'Turistica'])
    clase?: string;
  
    @IsOptional()
    @IsIn(['Libre', 'Reservado', 'Vendido', 'Devolucion'])
    estado?: string;
  
    @IsOptional()
    @IsInt()
    ultimaActualizacion?: number;
  
    @IsOptional()
    @IsObject()
    vectorClock?: Record<string, number>;
  }
  