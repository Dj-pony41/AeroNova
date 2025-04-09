// src/mongo/pasajero/entities/pasajero.entity.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Pasajero extends Document {
  @Prop({ required: true, unique: true })
  pasaporte: number; // @PrimaryColumn() → @Prop({ unique: true })

  @Prop({ required: true, maxlength: 100 })
  nombreCompleto: string;

  // Nota: No se define @OneToMany (las transacciones referenciarán este pasaporte)
}

export const PasajeroSchema = SchemaFactory.createForClass(Pasajero);