import { Module } from '@nestjs/common';
import { BatchService } from './batch.service';
import { ScheduleModule } from '@nestjs/schedule';
import { RankModule } from 'src/rank/rank.module';
import { ItemModule } from 'src/item/item.module';
import { NewsModule } from 'src/news/news.module';
import { GameModule } from 'src/game/game.module';
import { StatisticsModule } from 'src/statistics/statistics.module';
import { AppLoggerModule } from 'src/shared/logger/logger.module';

@Module({
  imports: [ScheduleModule.forRoot(), RankModule, ItemModule, NewsModule, GameModule, StatisticsModule, AppLoggerModule],
  providers: [BatchService],
})
export class BatchModule {}
