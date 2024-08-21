import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeormFactory = (configService: ConfigService): TypeOrmModuleOptions => ({
  type: 'postgres',
  host: configService.get<string>('DB_HOST'),
  port: configService.get<number>('DB_PORT'),
  username: configService.get<string>('DB_USER'),
  database: configService.get<string>('DB_NAME'),
  password: configService.get<string>('DB_PASSWORD'),
  entities: [__dirname + '../../../**/*.entity{.ts,.js}'],
  synchronize: false,
  logging: ['error'],
});
