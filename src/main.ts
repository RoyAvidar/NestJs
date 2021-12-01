import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {graphqlUploadExpress} from 'graphql-upload';
import * as bodyParser from 'body-parser';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe()); //global pipe.
  app.use(graphqlUploadExpress());
  app.use(bodyParser.json({limit: "50mb"}));
  app.use(bodyParser.urlencoded({limit: "50mb", extended: true}));
  await app.listen(8000);
}
bootstrap();