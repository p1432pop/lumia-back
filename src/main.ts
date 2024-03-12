import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { readFileSync } from 'fs';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const NODE_ENV = process.env.NODE_ENV;
  if (NODE_ENV === 'dev') {
    const app = await NestFactory.create(AppModule);
    app.use(cookieParser());
    await app.listen(8080);
  } else if (NODE_ENV === 'prod') {
    const httpsOptions = {
      ca: readFileSync('./config/fullchain.pem'),
      key: readFileSync('./config/privkey.pem'),
      cert: readFileSync('./config/cert.pem'),
    };
    const app = await NestFactory.create(AppModule, { httpsOptions });
    app.use(cookieParser());
    await app.listen(8080);
  }
}
bootstrap();
