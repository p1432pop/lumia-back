import { Injectable } from '@nestjs/common';
import { AxiosService } from 'src/axios/axios.service';
import { PlayerRepository } from './player.repository';
import { GameService } from 'src/game/game.service';

@Injectable()
export class PlayerService {
  constructor(
    private readonly axiosService: AxiosService,
    private readonly playerRepository: PlayerRepository,
    private readonly gameService: GameService,
  ) {}
  async get(nickname: string) {
    const userNum = await this.axiosService.getUserNumByNickname(nickname);
    console.log(userNum);
    const result = await this.playerRepository.getPlayerByUserNum(userNum);
    const result2 = await this.gameService.get(userNum);
    return result2;
    if (result) {
      //DB에 있는 플레이어
      const updated = new Date(result.updated);
      const now = new Date();
      if (now.getTime() - updated.getTime() < 5 * 60 * 1000) {
        // 최근 갱신한 경우
      } else {
        // 갱신 가능
        return {
          view: 2,
          userNum,
          games: 1,
          updated: 1,
        };
      }
    } else {
      //DB에 없는 플레이어
      return {
        view: 3,
        userNum,
        games: [],
        updated: undefined,
      };
    }
    return userNum;
  }
  async get2() {
    const dto = await this.playerRepository.getPlayerByUserNum(123);
    return this.playerRepository.create(dto);
  }
  async get3(userNum: number) {
    return await this.playerRepository.getPlayerByUserNum(userNum);
  }
}
