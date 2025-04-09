import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'asientos' })
export class MongoAsiento extends Document {
  @Prop({ required: true })
  idAsiento: number;

  @Prop({ required: true })
  vueloId: number;

  @Prop({ required: true })
  numeroAsiento: string;

  @Prop({ required: true, enum: ['Ejecutiva', 'Turistica'] })
  clase: string;

  @Prop({ required: true, enum: ['Libre', 'Reservado', 'Vendido', 'Devolucion'] })
  estado: string;

  @Prop()
  ultimaActualizacion: number;

  @Prop({ type: Object })
  vectorClock: Record<string, number>;
}

export const AsientoSchema = SchemaFactory.createForClass(MongoAsiento);
