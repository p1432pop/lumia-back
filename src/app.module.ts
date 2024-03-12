import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RankModule } from './rank/rank.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { BatchModule } from './batch/batch.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          type: 'mysql',
          host: configService.get<string>('DB_HOST'),
          port: configService.get<number>('DB_PORT'),
          username: configService.get<string>('DB_USER'),
          database: configService.get<string>('DB_NAME'),
          password: configService.get<string>('DB_PASSWORD'),
          entities: [__dirname + '/**/*.entity{.ts,.js}'],
          synchronize: configService.get<boolean>('SYNC'),
        };
      },
    }),
    /* ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../../build'),
    }), */
    RankModule,
    BatchModule,
  ],
})
export class AppModule {}
