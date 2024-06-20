import { Inject, Injectable } from '@nestjs/common';
import { RankRepository } from './rank.repository';
import { AxiosService } from 'src/axios/axios.service';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { ConfigService } from '@nestjs/config';
import { RankDTO } from './dto/rank.dto';

@Injectable()
export class RankService {
  private readonly seasonId: number;
  constructor(
    private readonly rankRepository: RankRepository,
    private readonly axiosService: AxiosService,
    private readonly configService: ConfigService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {
    this.seasonId = this.configService.get<number>('CURRENT_SEASON_ID') || 25;
  }
  async getMainRanking(): Promise<RankDTO> {
    const topRanks = await this.rankRepository.getRanking(this.seasonId, 1, 5);
    const { updated } = await this.rankRepository.getUpdatedTime(this.seasonId);
    return {
      topRanks,
      updated,
    };
  }
  async getRanking(seasonId: number, page: number): Promise<RankDTO> {
    const key = seasonId.toString() + '_' + page.toString();
    let value = await this.cacheManager.get<RankDTO>(key);
    if (!value) {
      const topRanks = await this.rankRepository.getRanking(seasonId, page);
      const { updated } = await this.rankRepository.getUpdatedTime(seasonId);
      value = {
        topRanks,
        updated,
      };
      await this.cacheManager.set(key, value);
    }
    return value;
  }
  async updateRanking(seasonId: number): Promise<void> {
    const result = await this.axiosService.getSeasonRanking(seasonId);
    await this.rankRepository.updateRanking(result, seasonId);

    // 캐시에 값이 있으면 삭제
    let keys: string[] = [];
    for (let i = 1; i <= 10; i++) {
      keys.push(seasonId.toString() + '_' + i.toString());
    }
    keys.push('/rank');
    await this.cacheManager.store.mdel(...keys);
  }
}
