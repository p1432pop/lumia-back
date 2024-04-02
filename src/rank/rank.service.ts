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
  async getRanking(seasonId: number, page: number): Promise<RankRO> {
    let key: string = seasonId.toString() + '_' + page.toString();
    let value: RankRO = await this.cacheManager.get(key);
    if (!value) {
      value = await this.rankRepository.getRanking(seasonId, page);
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
    await this.cacheManager.store.mdel(...keys);
  }
}
