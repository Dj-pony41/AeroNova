import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { SyncModule } from './sync/sync.module';
import { MongoModule } from './mongo/mongo.module';

import { DestinoModule } from './mysql/destino/destino.module';
import { NaveModule } from './mysql/nave/nave.module';
import { RutaModule } from './mysql/ruta/ruta.module';
import { VueloModule } from './mysql/vuelo/vuelo.module';
import { PasajeroModule } from './mysql/pasajero/pasajero.module';
import { AsientoModule } from './mysql/asiento/asiento.module';
import { HistorialAsientoModule } from './mysql/historial-asiento/historial-asiento.module';
import { TransaccionModule } from './mysql/transaccion/transaccion.module';
import * as dotenv from 'dotenv';
dotenv.config();

const mysqlModules = [
  DestinoModule,
  NaveModule,
  RutaModule,
  VueloModule,
  PasajeroModule,
  AsientoModule,
  HistorialAsientoModule,
  TransaccionModule,
];

// 🧪 Aquí va tu log de depuración
console.log('🧪 Tipo de base de datos:', process.env.DB_TYPE);

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),

    ...(process.env.DB_TYPE === 'mongodb' ? [MongoModule] : mysqlModules),

    SyncModule,
  ],
})
export class AppModule {}
