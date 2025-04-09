import { Module } from '@nestjs/common';
import { DestinoModule } from './destino/destino.module';
import { AsientoModule } from './asiento/asiento.module';
import { HistorialAsientoModule } from './historial-asiento/historial-asiento.module';
import { NaveModule } from './nave/nave.module';
import { PasajeroModule } from './pasajero/pasajero.module';
import { RutaModule } from './ruta/ruta.module';
import { TransaccionModule } from './transaccion/transaccion.module';
import { VueloModule } from './vuelo/vuelo.module';

@Module({
  imports: [DestinoModule, AsientoModule, HistorialAsientoModule, NaveModule, PasajeroModule, RutaModule, TransaccionModule, VueloModule]
})
export class MongoModule {}
