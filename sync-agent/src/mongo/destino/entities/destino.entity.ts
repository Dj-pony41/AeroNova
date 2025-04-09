// src/mongo/destino/entities/destino.entity.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true }) // Opcional: `createdAt` y `updatedAt` automáticos
export class Destino extends Document {
  @Prop({ required: true, unique: true })
  idDestino: number; // Equivalente a @PrimaryGeneratedColumn()

  @Prop({ 
    required: true,
    maxlength: 100 
  })
  ciudad: string;

  @Prop({ 
    required: true,
    maxlength: 100 
  })
  pais: string;

  @Prop({ 
    required: true,
    maxlength: 150 
  })
  aeropuerto: string;

  @Prop({ 
    required: true,
    match: /^[A-Z]{3}$/, // Valida 3 letras mayúsculas
    maxlength: 3,
    minlength: 3
  })
  codigoIATA: string;

  // Nota: En MongoDB no se definen relaciones @OneToMany aquí (se manejan en servicio)
}

export const DestinoSchema = SchemaFactory.createForClass(Destino);