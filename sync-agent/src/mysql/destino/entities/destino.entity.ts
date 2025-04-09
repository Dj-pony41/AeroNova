import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Ruta } from '../../ruta/entities/ruta.entity';

@Entity()
export class Destino {
  @PrimaryGeneratedColumn()
  idDestino: number;

  @Column({ length: 100 })
  ciudad: string;

  @Column({ length: 100 })
  pais: string;

  @Column({ length: 150 })
  aeropuerto: string;

  @Column({ length: 10 })
  codigoIATA: string;

  // Relación: Un Destino puede ser origen en muchas Rutas
  @OneToMany(() => Ruta, (ruta) => ruta.origen)
  rutasComoOrigen: Ruta[];

  // Relación: Un Destino puede ser destino en muchas Rutas
  @OneToMany(() => Ruta, (ruta) => ruta.destino)
  rutasComoDestino: Ruta[];
}