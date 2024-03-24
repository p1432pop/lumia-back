import { Injectable } from '@nestjs/common';
import { AxiosService } from 'src/axios/axios.service';
import { PlayerRepository } from './player.repository';
import { GameService } from 'src/game/game.service';
import { UpdatePlayerDto } from './dto/update-player.dto';
import { Player } from './player.entity';

@Injectable()
export class PlayerService {
  constructor(
    private readonly axiosService: AxiosService,
    private readonly playerRepository: PlayerRepository,
    private readonly gameService: GameService,
  ) {}
  async get(nickname: string, seasonId: number) {
    const userNum = await this.axiosService.getUserNumByNickname(nickname);
    const result = await this.playerRepository.getPlayerByUserNum(userNum);
    if (result) {
      //DB에 있는 플레이어
      const games = await this.gameService.getFromDB(userNum);
      const rank = await this.axiosService.getRankByUserNum(userNum, seasonId);
      const ret = {
        view: 2,
        nickname,
        userNum,
        games,
        lastGameId: result.lastGameId,
        updated: result.updated,
        rank,
      };
      if (new Date().getTime() - result.updated.getTime() < 5 * 60 * 1000) {
        ret.view = 1;
      }
      return ret;
    } else {
      //DB에 없는 플레이어
      return {
        view: 3,
        nickname,
        userNum,
        games: [],
        lastGameId: 0,
        updated: null,
        rank: null,
      };
    }
  }
  async post(updatePlayerDto: UpdatePlayerDto) {
    const { userNum, nickname, lastGameId } = updatePlayerDto;
    let flag: boolean = true;
    let games = [];
    let next: number | undefined = undefined;
    while (flag) {
      const result = next ? await this.axiosService.getGamesByUserNum(userNum, next) : await this.axiosService.getGamesByUserNum(userNum);
      console.log(next);
      next = result.next;
      for (let game of result.userGames) {
        if (game.matchingMode === 3 && game.gameId > lastGameId && game.seasonId === 23) {
          games.push(game);
        }
        if (!next || (game.seasonId > 0 && game.seasonId < 23) || game.gameId <= lastGameId || games.length >= 30) {
          flag = false;
          break;
        }
      }
      if (!next) {
        break;
      }
    }
    await this.gameService.insertGames(games);
    let player = new Player();
    player.userNum = userNum;
    player.nickname = nickname;
    player.lastGameId = games[0]?.gameId || lastGameId;
    player.updated = new Date();
    const result = await this.playerRepository.updatePlayer(player);
    const rank = await this.axiosService.getRankByUserNum(userNum, 23);
    games = await this.gameService.getFromDB(userNum);
    return {
      view: 1,
      userNum,
      games,
      updated: result.updated,
      lastGameId: result.lastGameId,
      rank,
    };
  }
}
