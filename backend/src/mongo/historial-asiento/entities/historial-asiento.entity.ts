// src/mongo/historial-asiento/entities/historial-asiento.entity.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true }) // Opcional: `createdAt` y `updatedAt` automáticos
export class HistorialAsiento extends Document {
  @Prop({ required: true, unique: true })
  idHistorial: number;

  @Prop({ 
    required: true,
    enum: ['Libre', 'Reservado', 'Vendido', 'Devolucion'] // Valores posibles
  })
  estadoAnterior: string;

  @Prop({ 
    required: true,
    enum: ['Libre', 'Reservado', 'Vendido', 'Devolucion']
  })
  estadoNuevo: string;

  @Prop({ required: true })
  epochCambio: number; // Tipo bigint en MySQL → number en MongoDB

  @Prop({ required: true })
  nodoOrigen: number;

  @Prop({ required: true })
  asientoId: number; // Referencia al ID del asiento (relación)
}

export const HistorialAsientoSchema = SchemaFactory.createForClass(HistorialAsiento);