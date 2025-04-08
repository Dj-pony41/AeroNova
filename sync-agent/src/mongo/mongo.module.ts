import { Module } from '@nestjs/common';
import { MongoRootModule } from './mongo-root.module';

const isMongo = process.env.DB_TYPE === 'mongodb';

@Module({
  imports: isMongo
    ? [
        require('@nestjs/mongoose').MongooseModule.forRoot(
          process.env.MONGO_URI || 'mongodb://localhost:27017/aeronovanongo',
        ),
        require('./destino/destino.module').DestinoModule,
        require('./asiento/asiento.module').AsientoModule,
        require('./historial-asiento/historial-asiento.module').HistorialAsientoModule,
        require('./nave/nave.module').NaveModule,
        require('./pasajero/pasajero.module').PasajeroModule,
        require('./ruta/ruta.module').RutaModule,
        require('./transaccion/transaccion.module').TransaccionModule,
        require('./vuelo/vuelo.module').VueloModule,
      ]
    : [],
  exports: isMongo ? [require('@nestjs/mongoose').MongooseModule] : [],
})
export class MongoModule {}
