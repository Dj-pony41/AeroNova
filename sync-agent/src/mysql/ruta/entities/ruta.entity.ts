import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Destino } from '../../destino/entities/destino.entity';
import { Vuelo } from 'src/mysql/vuelo/entities/vuelo.entity';

@Entity()
export class Ruta {
  @PrimaryGeneratedColumn()
  idRuta: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  costoEjecutiva: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  costoTuristica: number;

    // Relación: Una Nave puede tener muchos Vuelos
  @OneToMany(() => Vuelo, (vuelo) => vuelo.ruta)
  vuelos: Vuelo[];

  // Relación: Muchas Rutas tienen un Origen (Destino)
  @ManyToOne(() => Destino, (destino) => destino.rutasComoOrigen)
  @JoinColumn({ name: 'origenId' })
  origen: Destino;

  // Relación: Muchas Rutas tienen un Destino (Destino)
  @ManyToOne(() => Destino, (destino) => destino.rutasComoDestino)
  @JoinColumn({ name: 'destinoId' })
  destino: Destino;
}