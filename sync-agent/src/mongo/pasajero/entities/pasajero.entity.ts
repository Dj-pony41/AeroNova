import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'pasajeros' }) // ✅ usamos colección existente
export class MongoPasajero extends Document {
  @Prop({ required: true })
  Pasaporte: number; // ✅ mantener mayúsculas

  @Prop({ required: true })
  NombreCompleto: string;
}

export const PasajeroSchema = SchemaFactory.createForClass(MongoPasajero);
