import { Module } from '@nestjs/common';
import { DestinoModule } from './mysql/destino/destino.module';
import { NaveModule } from './mysql/nave/nave.module';
import { RutaModule } from './mysql/ruta/ruta.module';
import { VueloModule } from './mysql/vuelo/vuelo.module';
import { PasajeroModule } from './mysql/pasajero/pasajero.module';
import { AsientoModule } from './mysql/asiento/asiento.module';
import { HistorialAsientoModule } from './mysql/historial-asiento/historial-asiento.module';
import { TransaccionModule } from './mysql/transaccion/transaccion.module';
import { SyncModule } from './sync/sync.module';
import { MongoModule } from './mongo/mongo.module';
@Module({
  imports: [DestinoModule, NaveModule, RutaModule, VueloModule, PasajeroModule, AsientoModule, HistorialAsientoModule, TransaccionModule, SyncModule, MongoModule],
})
export class AppModule {}
