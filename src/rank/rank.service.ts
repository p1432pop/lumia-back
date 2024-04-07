import { Inject, Injectable } from '@nestjs/common';
import { RankRepository } from './rank.repository';
import { AxiosService } from 'src/axios/axios.service';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { RankRO } from './rank.interface';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class RankService {
  constructor(
    private readonly rankRepository: RankRepository,
    private readonly axiosService: AxiosService,
    private readonly configService: ConfigService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}
  async getMainRanking(): Promise<RankRO> {
    const seasonId = this.configService.get<number>('CURRENT_SEASON_ID');
    return await this.rankRepository.getRanking(seasonId, 1, 5);
  }
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
    keys.push('/rank');
    await this.cacheManager.store.mdel(...keys);
  }
}
