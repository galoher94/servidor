import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Validacion
  app.useGlobalPipes(new ValidationPipe({ transform: true }))

  // Swagger
  const config = new DocumentBuilder()
    .setTitle('Documentación APP-CRUD')
    .setDescription('Documentación de la APP-CRUD desarrollada con NestJS')
    .setVersion('1.0')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, documentFactory);
  
  app.enableCors();
  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();
