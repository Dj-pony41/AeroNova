// src/mongo/transaccion/entities/transaccion.entity.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Transaccion extends Document {
  @Prop({ required: true, unique: true })
  idTransaccion: number;

  @Prop({ 
    required: true,
    enum: ['Reserva', 'Venta', 'Anulacion', 'Devolucion'] 
  })
  operacion: string;

  @Prop({ required: true })
  fechaOperacion: number; // Tipo bigint en MySQL → number en MongoDB

  @Prop({ required: true, maxlength: 30 })
  origenTransaccion: string;

  @Prop({ type: Object }) // Cambio: Ahora es un objeto (no string)
  vectorClock?: Record<string, number>;

  @Prop()
  servidorConectado?: number;

  // Relaciones (por referencia)
  @Prop({ required: true })
  asientoId: number; // Referencia al ID del asiento

  @Prop({ required: true })
  pasaporte: number; // Referencia al pasaporte del pasajero
}

export const TransaccionSchema = SchemaFactory.createForClass(Transaccion);