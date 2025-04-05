import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Vuelo } from '../../vuelo/entities/vuelo.entity';
import { Transaccion } from 'src/transaccion/entities/transaccion.entity';
import { HistorialAsiento } from 'src/historial-asiento/entities/historial-asiento.entity';

@Entity()
export class Asiento {
  @PrimaryGeneratedColumn()
  idAsiento: number;

  @Column({ length: 10 })
  numeroAsiento: string;

  @Column({ length: 10 })
  clase: string; // 'Ejecutiva' | 'Turistica'

  @Column({ length: 15 })
  estado: string; // 'Libre' | 'Reservado' | 'Vendido' | 'Devolucion'

  @Column({ type: 'bigint', nullable: true })
  ultimaActualizacion: number;

  @Column({ type: 'text', nullable: true })
  vectorClock: string;

  // Relación: Muchos Asientos pertenecen a un Vuelo
  @ManyToOne(() => Vuelo, (vuelo) => vuelo.asientos)
  vuelo: Vuelo;

  // Relación: Un Asiento puede tener muchas Transacciones
  @OneToMany(() => Transaccion, (transaccion) => transaccion.pasajero)
  transacciones: Transaccion[];

  // Relación con HistorialAsiento
  @OneToMany(() => HistorialAsiento, (historial) => historial.asiento)
  historiales: HistorialAsiento[];
  
}