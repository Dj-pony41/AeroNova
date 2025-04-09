// src/mongo/vuelo/entities/vuelo.entity.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Vuelo extends Document {
  @Prop({ required: true, unique: true })
  idVuelo: number;

  @Prop({ required: true })
  fechaHoraSalida: number; // Timestamp (bigint → number)

  @Prop({ required: true })
  fechaHoraLlegada: number; // Timestamp

  @Prop({ required: true, unique: true, maxlength: 10 })
  codigoVuelo: string;

  @Prop({ required: true })
  esInternacional: boolean;

  // Relaciones por referencia (IDs)
  @Prop({ required: true })
  rutaId: number; // Reemplaza @ManyToOne

  @Prop({ required: true })
  naveId: number; // Reemplaza @ManyToOne

  // Nota: No se define @OneToMany (asientos se manejan en su colección)
}

export const VueloSchema = SchemaFactory.createForClass(Vuelo);