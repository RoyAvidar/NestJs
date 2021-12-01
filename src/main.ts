import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {graphqlUploadExpress} from 'graphql-upload';
import * as bodyParser from 'body-parser';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe()); //global pipe.
  app.use(graphqlUploadExpress()); //global pipe for uploading files.
  await app.listen(8000);
}
bootstrap();