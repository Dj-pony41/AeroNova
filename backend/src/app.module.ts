import { Module } from '@nestjs/common';
import { DestinoModule } from './destino/destino.module';
import { NaveModule } from './nave/nave.module';
import { RutaModule } from './ruta/ruta.module';
import { VueloModule } from './vuelo/vuelo.module';
import { PasajeroModule } from './pasajero/pasajero.module';
import { AsientoModule } from './asiento/asiento.module';
import { HistorialAsientoModule } from './historial-asiento/historial-asiento.module';
import { TransaccionModule } from './transaccion/transaccion.module';

@Module({
  imports: [DestinoModule, NaveModule, RutaModule, VueloModule, PasajeroModule, AsientoModule, HistorialAsientoModule, TransaccionModule],
})
export class AppModule {}
