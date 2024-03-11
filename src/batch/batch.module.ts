import { Module } from '@nestjs/common';
import { BatchService } from './batch.service';
import { ScheduleModule } from '@nestjs/schedule';
import { RankModule } from 'src/rank/rank.module';

@Module({
  imports: [ScheduleModule.forRoot(), RankModule],
  providers: [BatchService],
})
export class BatchModule {}
