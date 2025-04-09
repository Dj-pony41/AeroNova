import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class VueloService {
  constructor(private dataSource: DataSource) {}

  async obtenerResumenAsientos() {
    return this.dataSource.query(`
      SELECT 
          v.IdVuelo,
          v.CodigoVuelo,
          n.Matricula,
          a.Clase,
          a.Estado,
          COUNT(*) AS CantidadAsientos
      FROM vuelo v
      JOIN nave n ON v.IdNave = n.IdNave
      JOIN asiento a ON v.IdVuelo = a.IdVuelo
      GROUP BY v.IdVuelo, v.CodigoVuelo, n.Matricula, a.Clase, a.Estado
      ORDER BY v.IdVuelo, a.Clase, a.Estado;
    `);
  }
}
