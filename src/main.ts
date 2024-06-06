import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { readFileSync } from 'fs';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const NODE_ENV = process.env.NODE_ENV;
  if (NODE_ENV === 'dev') {
    const app = await NestFactory.create(AppModule);
    const config = new DocumentBuilder().setTitle('Lumia.kr').setDescription('API DOCS').setVersion('1.0.0').build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);
    app.enableCors();
    app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
        transformOptions: {
          enableImplicitConversion: true,
        },
      }),
    );
    app.useGlobalInterceptors(
      new ClassSerializerInterceptor(app.get(Reflector), {
        strategy: 'excludeAll',
        excludeExtraneousValues: true,
      }),
    );
    await app.listen(8080);
  } else if (NODE_ENV === 'prod') {
    const httpsOptions = {
      ca: readFileSync('./config/fullchain.pem'),
      key: readFileSync('./config/privkey.pem'),
      cert: readFileSync('./config/cert.pem'),
    };
    const app = await NestFactory.create(AppModule, { httpsOptions });
    app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
        transformOptions: {
          enableImplicitConversion: true,
        },
      }),
    );
    await app.listen(8080);
  }
}
bootstrap();
