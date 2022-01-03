import { ValidationPipe, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as helmet from 'helmet';

import { AppModule } from './app.module';
import AppResponse from './common/models/AppResponse';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  // Helmet can help protect your app from some well-known web vulnerabilities
  // by setting HTTP headers appropriately
  app.use((helmet as any)());

  app.enableVersioning({
    type: VersioningType.URI,
  });

  // auto validation
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      exceptionFactory: AppResponse.validationFailedFromValidatorErrors,
    }),
  );

  // swagger OPENAPI
  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('API docs')
    .setDescription('The API document is generated automatically')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
