import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Asiento } from '../../asiento/entities/asiento.entity';
import { Pasajero } from '../../pasajero/entities/pasajero.entity';

@Entity()
export class Transaccion {
  @PrimaryGeneratedColumn()
  idTransaccion: number;

  @Column({ length: 15 })
  operacion: string; // 'Reserva' | 'Venta' | 'Anulacion' | 'Devolucion'

  @Column({ type: 'bigint' })
  fechaOperacion: number;

  @Column({ length: 30 })
  origenTransaccion: string;

  @Column({ type: 'text', nullable: true })
  vectorClock: string;

  @Column({ nullable: true })
  servidorConectado: number;

  // Relación: Muchas Transacciones pertenecen a un Asiento
  @ManyToOne(() => Asiento, (asiento) => asiento.transacciones)
  asiento: Asiento;

  // Relación: Muchas Transacciones pertenecen a un Pasajero
  @ManyToOne(() => Pasajero, (pasajero) => pasajero.transacciones)
  pasajero: Pasajero;
}