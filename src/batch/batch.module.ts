import { Module } from '@nestjs/common';
import { BatchService } from './batch.service';
import { ScheduleModule } from '@nestjs/schedule';
import { RankModule } from 'src/rank/rank.module';
import { ItemModule } from 'src/item/item.module';
import { NewsModule } from 'src/news/news.module';
import { GameModule } from 'src/game/game.module';
import { StatisticsModule } from 'src/statistics/statistics.module';

@Module({
  imports: [ScheduleModule.forRoot(), RankModule, ItemModule, NewsModule, GameModule, StatisticsModule],
  providers: [BatchService],
})
export class BatchModule {}
