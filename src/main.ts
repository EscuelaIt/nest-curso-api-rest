import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
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

  const config = new DocumentBuilder()
    .setTitle('Work Time System example')
    .setDescription('The work time system API description')
    .setVersion('1.0')
    .addTag('projects')
    .addTag('total-time-logs')
    .addTag('work-time-logs')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('doc', app, document);

  await app.listen(3000);
}
bootstrap();
