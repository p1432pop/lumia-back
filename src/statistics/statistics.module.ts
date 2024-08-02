import { Module } from '@nestjs/common';
import { StatisticsService } from './statistics.service';
import { StatisticsController } from './statistics.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserCharStat } from './entity/userCharStat.entity';
import { VersionStat } from './entity/versionStat.entity';
import { StatisticsRepository } from './statistics.repository';

@Module({
  imports: [TypeOrmModule.forFeature([UserCharStat, VersionStat])],
  controllers: [StatisticsController],
  providers: [StatisticsService, StatisticsRepository],
  exports: [StatisticsService],
})
export class StatisticsModule {}
