import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Vuelo } from '../../vuelo/entities/vuelo.entity';
import { Transaccion } from 'src/mysql/transaccion/entities/transaccion.entity';
import { HistorialAsiento } from 'src/mysql/historial-asiento/entities/historial-asiento.entity';

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

// En la entidad MySQL (corrección)
  @Column({ type: 'json', nullable: true }) // ← Cambiado de 'text' a 'json'
  vectorClock: Record<string, number>; // Tipo correcto para JSON

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