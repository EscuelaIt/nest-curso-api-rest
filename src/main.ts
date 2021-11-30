import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // quita propiedad
      forbidNonWhitelisted: true, // genera error si hay una propiedad sobrante,
      stopAtFirstError: false, // emite un solo error por propiedad
    })
  )

  await app.listen(3000);
}
bootstrap();
