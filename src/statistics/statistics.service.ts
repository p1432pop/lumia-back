import { Injectable } from '@nestjs/common';
import { StatisticsRepository } from './statistics.repository';
import { VersionStatQueryDTO } from './dto/stat-query.dto';
import { UserCharStatDTO } from './dto/userCharStat.dto';
import { VersionStatDTO } from './dto/versionStat.dto';

@Injectable()
export class StatisticsService {
  constructor(private readonly statisticsRepository: StatisticsRepository) {}

  async refresh(): Promise<void> {
    await this.statisticsRepository.refresh();
  }

  async getUserCharStat(userNum: number): Promise<UserCharStatDTO[]> {
    return await this.statisticsRepository.getUserCharStat(userNum);
  }

  async getVersionStat(query: VersionStatQueryDTO): Promise<VersionStatDTO[]> {
    return await this.statisticsRepository.getVersionStat(query);
  }
}
