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
    try {
      await this.versionStatRepository.query('REFRESH MATERIALIZED VIEW CONCURRENTLY game_mat_view');
      console.log('refresh success', new Date());
    } catch (e) {
      console.log(e, new Date());
    }
  }

  async getVersionStat(query: VersionStatQueryDTO): Promise<VersionStat[]> {
    const { versionMajor, versionMinor, tier, isRank } = query;
    return await this.versionStatRepository.find({
      where: {
        versionMajor,
        versionMinor,
        tier,
        isRank,
      },
      order: { totalGames: 'DESC' },
    });
  }

  async getUserCharStat(userNum: number): Promise<UserCharStat[]> {
    return await this.userStatRepostiory.find({ where: { userNum } });
  }
}
