import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { RankModule } from './rank/rank.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { BatchModule } from './batch/batch.module';
import { AxiosModule } from './axios/axios.module';
import { AxiosService } from './axios/axios.service';
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
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../build'),
    }),
    RankModule,
    BatchModule,
    AxiosModule,
  ],
  controllers: [AppController],
  providers: [AppService, AxiosService],
})
export class AppModule {}
