import { INestApplication, ValidationPipe, ClassSerializerInterceptor } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppLogger } from './shared/logger/logger.service';

function swaggerSetup(app: INestApplication): void {
  const config = new DocumentBuilder().setTitle('Lumia.kr').setDescription('API DOCS').setVersion('1.0.0').build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
}

export function setup(app: INestApplication): void {
  app.setGlobalPrefix('api');
  app.useLogger(new AppLogger());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
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
  swaggerSetup(app);
}
