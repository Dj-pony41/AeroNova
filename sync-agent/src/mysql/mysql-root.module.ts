// src/mysql/mysql-root.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

// Importa tus módulos de dominio MySQL (ajusta las rutas según tu estructura)
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
    // Configuración global de TypeORM usando forRootAsync junto con ConfigService:
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule], // Asegúrate de importar ConfigModule
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('MYSQL_HOST'),
        port: configService.get<number>('MYSQL_PORT', 3306), // Valor por defecto en caso de no encontrarlo
        username: configService.get<string>('MYSQL_USER'),
        password: configService.get<string>('MYSQL_PASSWORD'),
        database: configService.get<string>('MYSQL_DATABASE'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: false, // Sólo en desarrollo; en producción desactívalo
      }),
    }),
    // Módulos de dominio MySQL:
    AsientoModule,
    DestinoModule,
    HistorialAsientoModule,
    NaveModule,
    PasajeroModule,
    RutaModule,
    TransaccionModule,
    VueloModule,
  ],
  exports: [],
})
export class MysqlRootModule {}
