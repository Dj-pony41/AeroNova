import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

import * as dotenv from 'dotenv';

dotenv.config();
console.log('✅ ENV DB_TYPE desde main.ts:', process.env.DB_TYPE);


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORT ?? 3250);
  console.log('🚀 Servidor corriendo en http://localhost:3250');
}
bootstrap();
