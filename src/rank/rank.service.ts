import { Inject, Injectable } from '@nestjs/common';
import { RankRepository } from './rank.repository';
import { AxiosService } from 'src/axios/axios.service';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { RankRO } from './rank.interface';

@Injectable()
export class RankService {
  constructor(
    private readonly rankRepository: RankRepository,
    private readonly axiosService: AxiosService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}
  async getRanking(seasonId: number): Promise<RankRO> {
    let value: RankRO = await this.cacheManager.get(seasonId.toString());
    if (!value) {
      value = await this.rankRepository.getRanking(seasonId);
      await this.cacheManager.set(seasonId.toString(), value);
    }
    return value;
  }
  async updateRanking(seasonId: number): Promise<void> {
    const result = await this.axiosService.getSeasonRanking(seasonId);
    await this.rankRepository.updateRanking(result, seasonId);

    // 캐시에 값이 있으면 업데이트
    const value = await this.cacheManager.get(seasonId.toString());
    if (value) {
      const newValue = await this.rankRepository.getRanking(seasonId);
      await this.cacheManager.set(seasonId.toString(), newValue);
    }
  }
}
