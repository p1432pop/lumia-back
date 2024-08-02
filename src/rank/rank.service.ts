import { Inject, Injectable } from '@nestjs/common';
import { RankRepository } from './rank.repository';
import { AxiosService } from 'src/axios/axios.service';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { ConfigService } from '@nestjs/config';
import { RankDTO } from './dto/rank.dto';
import { RankQueryDTO } from './dto/rank-query.dto';

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

  async getMainRanking(): Promise<RankDTO | null> {
    const updated = await this.rankRepository.getRanking(this.seasonId, 1, 5);
    return updated;
  }

  async getRanking(query: RankQueryDTO): Promise<RankDTO | null> {
    const { seasonId, page } = query;
    const key = this.getCacheKey(seasonId, page);
    const cachedRank = await this.cacheManager.get<RankDTO>(key);

    // 캐시에 값이 있는 경우
    if (cachedRank) return cachedRank;

    const updated = await this.rankRepository.getRanking(seasonId, page);

    if (updated) {
      await this.cacheManager.set(key, updated);
      return updated;
    }

    return null;
  }

  async updateRanking(seasonId: number): Promise<void> {
    const result = await this.axiosService.getSeasonRanking(seasonId);
    await this.rankRepository.updateRanking(result, seasonId);

    // 캐시에 값이 있으면 삭제
    let keys: string[] = [];
    for (let page = 1; page <= 10; page++) {
      keys.push(this.getCacheKey(seasonId, page));
    }
    // main ranking key
    keys.push('/rank');
    await this.cacheManager.store.mdel(...keys);
  }

  private getCacheKey(seasonId: number, page: number): string {
    return seasonId.toString() + '_' + page.toString();
  }
}
