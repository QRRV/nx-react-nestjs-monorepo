import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TransformInterceptor } from '@moviebuddy/shared';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  app.useGlobalInterceptors(new TransformInterceptor());
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);

  const port = process.env.RCMND_PORT || 3001;
  app.enableCors({
    origin: '*',
  });

  await app.listen(port);

  Logger.log(`🚀 RCNMD is running on: http://localhost:${port}/${globalPrefix}`);
}

bootstrap();
