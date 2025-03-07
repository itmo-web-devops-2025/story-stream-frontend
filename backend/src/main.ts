import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import * as process from 'process';
import { AppModule } from '@/app.module';
import { SwaggerModule } from '@nestjs/swagger';
import { CORS_OPTIONS } from '@/config/cors.config';
import { SWAGGER_CONFIG } from '@/config/swagger.config';
import { VALIDATION_PIPE } from '@/config/validation.config';

async function bootstrap() {
  const adapter = new FastifyAdapter();
  adapter.enableCors(CORS_OPTIONS);

  const app = await NestFactory.create<NestFastifyApplication>(AppModule, adapter);

  app.useGlobalPipes(VALIDATION_PIPE);

  const document = SwaggerModule.createDocument(app, SWAGGER_CONFIG);
  SwaggerModule.setup('api-docs', app, document);

  const port = +(process.env.SERVER_PORT || 3000);

  await app.listen(port, '0.0.0.0');
  console.info(`Server started: http://localhost:${port}`);
}
bootstrap();
