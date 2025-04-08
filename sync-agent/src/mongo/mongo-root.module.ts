import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

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
    MongooseModule.forRoot(process.env.MONGO_URI || 'mongodb://localhost:27017/aeronovanongo'),
    AsientoModule,
    DestinoModule,
    HistorialAsientoModule,
    NaveModule,
    PasajeroModule,
    RutaModule,
    TransaccionModule,
    VueloModule,
  ],
})
export class MongoRootModule {}
