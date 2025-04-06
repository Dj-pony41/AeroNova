// src/mongo/nave/entities/nave.entity.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Nave extends Document {
  @Prop({ required: true, unique: true })
  idNave: number;

  @Prop({ required: true, maxlength: 50 })
  tipo: string;

  @Prop({ required: true })
  capacidadEjecutiva: number;

  @Prop({ required: true })
  capacidadTuristica: number;

  @Prop({ required: true, unique: true, maxlength: 20 })
  matricula: string;

  @Prop()
  ultimoVuelo?: number;

  @Prop()
  horasVueloTotal?: number;

  @Prop()
  ciclosVuelo?: number;

  @Prop()
  distanciaTotal?: number;
}

export const NaveSchema = SchemaFactory.createForClass(Nave);