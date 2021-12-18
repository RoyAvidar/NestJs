import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {graphqlUploadExpress} from 'graphql-upload';
import * as bodyParser from 'body-parser';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalPipes(new ValidationPipe()); //global pipe.
  app.useStaticAssets(join(__dirname, '..', 'user-uploads'));
  app.useStaticAssets(join(__dirname, '..', 'product-uploads'));
  app.use(graphqlUploadExpress()); //global pipe for uploading files.
  await app.listen(8000);
}
bootstrap();