import { Entity, PrimaryColumn, Column, OneToMany } from 'typeorm';
import { Transaccion } from '../../transaccion/entities/transaccion.entity';

@Entity()
export class Pasajero {
  @PrimaryColumn()
  pasaporte: number;

  @Column({ length: 100 })
  nombreCompleto: string;

  // Relación: Un Pasajero puede tener muchas Transacciones
  @OneToMany(() => Transaccion, (transaccion) => transaccion.pasajero)
  transacciones: Transaccion[];
}