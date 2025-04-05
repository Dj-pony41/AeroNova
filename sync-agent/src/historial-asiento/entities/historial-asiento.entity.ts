import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Asiento } from '../../asiento/entities/asiento.entity';

@Entity()
export class HistorialAsiento {
  @PrimaryGeneratedColumn()
  idHistorial: number;

  @Column({ length: 15 })
  estadoAnterior: string;

  @Column({ length: 15 })
  estadoNuevo: string;

  @Column({ type: 'bigint' })
  epochCambio: number;

  @Column()
  nodoOrigen: number;

  // Relación: Muchos Historiales pertenecen a un Asiento
  @ManyToOne(() => Asiento, (asiento) => asiento.historiales)
  asiento: Asiento;
}