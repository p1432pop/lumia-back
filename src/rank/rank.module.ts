import { Module } from '@nestjs/common';
import { RankController } from './rank.controller';
import { RankService } from './rank.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ranking } from './entity/ranking.entity';
import { RankRepository } from './rank.repository';
import { AxiosModule } from 'src/axios/axios.module';
import { Updated } from './entity/updated.entity';
import { CharacterStat } from './entity/characterStat.entity';
import { AppLoggerModule } from 'src/shared/logger/logger.module';

@Module({
  imports: [TypeOrmModule.forFeature([Ranking, Updated, CharacterStat]), AxiosModule, AppLoggerModule],
  controllers: [RankController],
  providers: [RankService, RankRepository],
  exports: [RankService],
})
export class RankModule {}
