import { Injectable } from '@nestjs/common';
import { RankRepository } from './rank.repository';
import { Ranking2 } from './season2.entity';
import { AxiosService } from 'src/axios/axios.service';

@Injectable()
export class RankService {
  constructor(
    private readonly rankRepository: RankRepository,
    private readonly axiosService: AxiosService,
  ) {}
  getRank(): Promise<any> {
    return this.rankRepository.getRank();
  }
  getUserNumByNickname(nickname: string): Promise<number> {
    return this.axiosService.getUserNumByNickname(nickname);
  }
  getGameByGameId(gameId: number): Promise<any> {
    return this.axiosService.getGameByGameId(gameId);
  }
  getGamesByGameIds(gameIds: number[]): Promise<any> {
    return this.rankRepository.insertGames(this.axiosService.getGamesByGameIds(gameIds));
  }
  updateRanking() {
    const result = this.axiosService.getSeasonRanking(21);
    return this.rankRepository.updateRanking(result);
  }
}
