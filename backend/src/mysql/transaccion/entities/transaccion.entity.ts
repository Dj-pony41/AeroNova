import { Asiento } from 'src/mysql/asiento/entities/asiento.entity';
import { Pasajero } from 'src/mysql/pasajero/entities/pasajero.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';


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
// En la entidad MySQL (corrección)
  @Column({ type: 'json', nullable: true }) // ← Cambiado de 'text' a 'json'
  vectorClock: Record<string, number>; // Tipo correcto para JSON

  @Column({ nullable: true })
  servidorConectado: number;

  // Relación: Muchas Transacciones pertenecen a un Asiento
  @ManyToOne(() => Asiento, (asiento) => asiento.transacciones)
  asiento: Asiento;

  // Relación: Muchas Transacciones pertenecen a un Pasajero
  @ManyToOne(() => Pasajero, (pasajero) => pasajero.transacciones)
  pasajero: Pasajero;
}