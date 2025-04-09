// src/mongo/pasajero/entities/pasajero.entity.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MongoPasajeroDocument = MongoPasajero & Document;

@Schema({ collection: 'pasajeros' }) // 👈 Usamos colección existente
export class MongoPasajero {
  @Prop({ required: true })
  pasaporte: number;

  @Prop({ required: true })
  nombreCompleto: string;
}

export const PasajeroSchema = SchemaFactory.createForClass(MongoPasajero);
