import { Module } from '@nestjs/common';
import { BatchService } from './batch.service';
import { ScheduleModule } from '@nestjs/schedule';
import { RankModule } from 'src/rank/rank.module';
import { ItemModule } from 'src/item/item.module';
import { NewsModule } from 'src/news/news.module';

@Module({
  imports: [ScheduleModule.forRoot(), RankModule, ItemModule, NewsModule],
  providers: [BatchService],
})
export class BatchModule {}
