// src/mysql/transaccion/entities/transaccion.entity.ts
import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Asiento } from 'src/mysql/asiento/entities/asiento.entity';
import { Pasajero } from 'src/mysql/pasajero/entities/pasajero.entity';

@Entity({ name: 'transaccion' })
export class Transaccion {
  @PrimaryColumn()
  IdTransaccion: number;

  @Column()
  IdAsiento: number;

  @Column()
  Pasaporte: number;

  @Column()
  Operacion: 'Devolucion' | 'Anulacion' | 'Venta' | 'Reserva';

  @Column({ type: 'bigint' })
  FechaOperacion: number;

  @Column()
  OrigenTransaccion: string;

  @Column({ type: 'json' })
  VectorClock: Record<string, number>;

  @Column()
  ServidorConectado: number;

  @ManyToOne(() => Asiento)
  @JoinColumn({ name: 'IdAsiento' })
  asiento: Asiento;

  @ManyToOne(() => Pasajero)
  @JoinColumn({ name: 'Pasaporte' })
  pasajero: Pasajero;
}
