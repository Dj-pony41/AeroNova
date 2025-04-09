import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'transacciones' })
export class MongoTransaccion extends Document {
  @Prop({ required: true })
  IdTransaccion: number;

  @Prop({ required: true })
  IdAsiento: number;

  @Prop({ required: true })
  Pasaporte: number;

  @Prop({ required: true, enum: ['Devolucion', 'Anulacion', 'Venta', 'Reserva'] })
  Operacion: string;

  @Prop({ required: true })
  FechaOperacion: number;

  @Prop({ required: true })
  OrigenTransaccion: string;

  @Prop({ required: true, type: Object })
  VectorClock: Record<string, number>;

  @Prop({ required: true })
  ServidorConectado: number;
}

export const TransaccionSchema = SchemaFactory.createForClass(MongoTransaccion);
