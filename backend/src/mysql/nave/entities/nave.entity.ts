import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Vuelo } from '../../vuelo/entities/vuelo.entity';

@Entity()
export class Nave {
  @PrimaryGeneratedColumn()
  idNave: number;

  @Column({ length: 50 })
  tipo: string;

  @Column()
  capacidadEjecutiva: number;

  @Column()
  capacidadTuristica: number;

  @Column({ length: 20, unique: true })
  matricula: string;

  @Column({ type: 'bigint', nullable: true })
  ultimoVuelo: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  horasVueloTotal: number;

  @Column({ nullable: true })
  ciclosVuelo: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  distanciaTotal: number;

  // Relación: Una Nave puede tener muchos Vuelos
  @OneToMany(() => Vuelo, (vuelo) => vuelo.nave)
  vuelos: Vuelo[];
}