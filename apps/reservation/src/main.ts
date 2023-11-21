import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ReservationModule } from './reservation.module';
import { Logger } from 'nestjs-pino';
import { ConfigService } from '@nestjs/config';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(ReservationModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  app.use(cookieParser());
  app.useLogger(app.get(Logger));
  const configService = app.get(ConfigService);

  await app.listen(configService.get('PORT'));
}
bootstrap();
