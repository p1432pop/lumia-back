import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserCharStat } from 'src/statistics/entity/userCharStat.entity';
import { VersionStat } from 'src/statistics/entity/versionStat.entity';
import { Repository } from 'typeorm';
import { VersionStatQueryDTO } from './dto/stat-query.dto';

@Injectable()
export class StatisticsRepository {
  constructor(
    @InjectRepository(UserCharStat)
    private readonly userStatRepostiory: Repository<UserCharStat>,
    @InjectRepository(VersionStat)
    private readonly versionStatRepository: Repository<VersionStat>,
  ) {}

  async refresh(): Promise<void> {
    await this.versionStatRepository.query('REFRESH MATERIALIZED VIEW CONCURRENTLY game_mat_view');
  }

  async getVersionStat(query: VersionStatQueryDTO): Promise<VersionStat[]> {
    return await this.versionStatRepository.find({
      where: query,
      order: { totalGames: 'DESC' },
    });
  }

  async getUserCharStat(userNum: number): Promise<UserCharStat[]> {
    return await this.userStatRepostiory.find({ where: { userNum } });
  }
}
