// src/mysql/mysql-root.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Importa los módulos de tus entidades MySQL.
// Asegúrate de que las rutas y nombres coincidan con tu estructura.
import { AsientoModule } from './asiento/asiento.module';
import { DestinoModule } from './destino/destino.module';
import { HistorialAsientoModule } from './historial-asiento/historial-asiento.module';
import { NaveModule } from './nave/nave.module';
import { PasajeroModule } from './pasajero/pasajero.module';
import { RutaModule } from './ruta/ruta.module';
import { TransaccionModule } from './transaccion/transaccion.module';
import { VueloModule } from './vuelo/vuelo.module';

@Module({
  imports: [
    // Configuración global de TypeORM para MySQL.
    // Los valores se toman de variables de entorno.
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.MYSQL_HOST,
      port: process.env.MYSQL_PORT ? parseInt(process.env.MYSQL_PORT, 10) : 3306,
      username: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
      autoLoadEntities: true,
      synchronize: false, // Cambia a true solo en desarrollo (no en producción)
    }),
    // Los módulos específicos del dominio MySQL
    AsientoModule,
    DestinoModule,
    HistorialAsientoModule,
    NaveModule,
    PasajeroModule,
    RutaModule,
    TransaccionModule,
    VueloModule,
  ],
  exports: [
    // Exporta lo que necesites que esté accesible a otros módulos
  ],
})
export class MysqlRootModule {}
