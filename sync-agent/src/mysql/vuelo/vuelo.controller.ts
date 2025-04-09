import { Controller, Get } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Controller('vuelos')
export class VueloController {
  constructor(private readonly dataSource: DataSource) {}

  @Get('resumen')
  async getResumenVuelos() {
    const result = await this.dataSource.query(`
      SELECT 
        v.CodigoVuelo AS code,
        CONCAT(
          d1.Pais, '(', d1.Ciudad, ') - ',
          d2.Pais, '(', d2.Ciudad, ') ',
          FROM_UNIXTIME(v.FechaHoraSalida / 1000, '%H:%i %d/%b/%Y')
        ) AS route,
        n.Matricula AS aircraft
      FROM vuelo v
      JOIN nave n ON v.IdNave = n.IdNave
      JOIN ruta r ON v.IdRuta = r.IdRuta
      JOIN destino d1 ON r.OrigenID = d1.IdDestino
      JOIN destino d2 ON r.DestinoID = d2.IdDestino
      ORDER BY v.FechaHoraSalida
    `);

    return result;
  }
}
