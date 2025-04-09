import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Ruta } from '../../ruta/entities/ruta.entity';
import { Nave } from '../../nave/entities/nave.entity';
import { Asiento } from '../../asiento/entities/asiento.entity';

@Entity()
export class Vuelo {
  @PrimaryGeneratedColumn()
  idVuelo: number;

  @Column({ type: 'bigint' })
  fechaHoraSalida: number;

  @Column({ type: 'bigint' })
  fechaHoraLlegada: number;

  @Column({ length: 10, unique: true })
  codigoVuelo: string;

  @Column({ type: 'boolean' })
  esInternacional: boolean;

  // Relación: Muchos Vuelos pertenecen a una Ruta
  @ManyToOne(() => Ruta, (ruta) => ruta.vuelos)
  ruta: Ruta;

  // Relación: Muchos Vuelos pertenecen a una Nave
  @ManyToOne(() => Nave, (nave) => nave.vuelos)
  nave: Nave;

  // Relación: Un Vuelo tiene muchos Asientos
  @OneToMany(() => Asiento, (asiento) => asiento.vuelo)
  asientos: Asiento[];
}