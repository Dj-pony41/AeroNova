// src/mongo/ruta/entities/ruta.entity.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Ruta extends Document {
  @Prop({ required: true, unique: true })
  idRuta: number;

  @Prop({ required: true })
  costoEjecutiva: number; // MongoDB usa Double (equivalente a decimal)

  @Prop({ required: true })
  costoTuristica: number;

  @Prop({ required: true })
  origenId: number; // Referencia al ID del destino (origen)

  @Prop({ required: true })
  destinoId: number; // Referencia al ID del destino (destino)
}

export const RutaSchema = SchemaFactory.createForClass(Ruta);