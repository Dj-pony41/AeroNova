// src/mongo/asiento/entities/asiento.entity.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true }) // Opcional: `createdAt` y `updatedAt` automáticos
export class MongoAsiento extends Document {
  @Prop({ required: true, unique: true })
  idAsiento: number; // Equivalente a @PrimaryGeneratedColumn()

  @Prop({ required: true })
  numeroAsiento: string;

  @Prop({ 
    required: true,
    enum: ['Ejecutiva', 'Turistica'] // Reemplaza @IsIn del DTO
  })
  clase: string;

  @Prop({
    required: true,
    enum: ['Libre', 'Reservado', 'Vendido', 'Devolucion']
  })
  estado: string;

  @Prop()
  ultimaActualizacion?: number;

  @Prop({ type: Object }) // MongoDB guarda objetos nativamente (no necesita ser string)
  vectorClock?: Record<string, number>; // Cambiamos de string a objeto

  // Relaciones (en MongoDB se manejan por referencia, no hay joins físicos)
  @Prop({ required: true })
  vueloId: number; // Referencia al ID del vuelo

  // Nota: No se definen @OneToMany (se manejan en servicio)
}

export const AsientoSchema = SchemaFactory.createForClass(MongoAsiento);