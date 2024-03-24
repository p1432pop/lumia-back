import { Injectable } from '@nestjs/common';
import { RankRepository } from './rank.repository';
import { Ranking } from './ranking.entity';
import { AxiosService } from 'src/axios/axios.service';
import { Updated } from './updated.entity';

@Injectable()
export class RankService {
  constructor(
    private readonly rankRepository: RankRepository,
    private readonly axiosService: AxiosService,
  ) {}
  getRanking(seasonId: number): Promise<{ data: Ranking[]; updated: Date }> {
    return this.rankRepository.getRanking(seasonId);
  }
  async updateRanking(seasonId: number) {
    const result = await this.axiosService.getSeasonRanking(seasonId);
    await this.rankRepository.updateRanking(result, seasonId);
  }
}
