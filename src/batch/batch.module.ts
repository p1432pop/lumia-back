import { Module } from '@nestjs/common';
import { BatchService } from './batch.service';
import { ScheduleModule } from '@nestjs/schedule';
import { ConfigModule } from '@nestjs/config';
import { RankModule } from 'src/rank/rank.module';
import { RankService } from 'src/rank/rank.service';

@Module({
  imports: [ScheduleModule.forRoot()],
  providers: [BatchService],
})
export class BatchModule {}
