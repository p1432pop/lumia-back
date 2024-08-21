import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RankModule } from './rank/rank.module';
import { BatchModule } from './batch/batch.module';
import { UserModule } from './user/user.module';
import { GameModule } from './game/game.module';
import { CacheModule } from '@nestjs/cache-manager';
import { NewsModule } from './news/news.module';
import { ItemModule } from './item/item.module';
import { StatisticsModule } from './statistics/statistics.module';
import { typeormFactory, queueFactory } from './shared/config';
import { BullModule } from '@nestjs/bullmq';
import { validator } from './shared/validator/env.validator';
@Module({
  imports: [
    ConfigModule.forRoot({
      validate: validator,
      cache: true,
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: typeormFactory,
    }),
    BullModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: queueFactory,
    }),
    CacheModule.register({ isGlobal: true, ttl: 600000 }),
    RankModule,
    BatchModule,
    UserModule,
    GameModule,
    NewsModule,
    ItemModule,
    StatisticsModule,
  ],
})
export class AppModule {}
