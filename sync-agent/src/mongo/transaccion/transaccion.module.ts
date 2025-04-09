import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TransaccionController } from './transaccion.controller';
import { TransaccionService } from './transaccion.service';
import { MongoTransaccion, TransaccionSchema } from './entities/transaccion.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: MongoTransaccion.name, schema: TransaccionSchema },
    ]),
  ],
  controllers: [TransaccionController],
  providers: [TransaccionService],
  exports: [TransaccionService],
})
export class TransaccionModule {}
