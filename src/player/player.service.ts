import { Injectable } from '@nestjs/common';
import { AxiosService } from 'src/axios/axios.service';
import { PlayerRepository } from './player.repository';
import { GameService } from 'src/game/game.service';
import { UpdatePlayerDto } from './dto/update-player.dto';
import { Player } from './player.entity';
import { PlayerAllRO, PlayerRO, ViewStatus } from './player.interface';

@Injectable()
export class PlayerService {
  constructor(
    private readonly axiosService: AxiosService,
    private readonly playerRepository: PlayerRepository,
    private readonly gameService: GameService,
  ) {}

  renewable(updated: Date): boolean {
    return new Date().getTime() - updated.getTime() > 5 * 60 * 1000;
  }

  async getRecentData(nickname: string, seasonId: number): Promise<PlayerAllRO> {
    const userNum = await this.axiosService.getUserNumByNickname(nickname);
    const result = await this.playerRepository.getPlayerByUserNum(userNum);
    if (result) {
      const games = await this.gameService.getFromDB(userNum, result.lastGameId);
      const rank = await this.axiosService.getRankByUserNum(userNum, seasonId);
      return {
        playerData: {
          view: this.renewable(result.updated) ? ViewStatus.OLD : ViewStatus.NEW,
          nickname,
          userNum,
          games,
          next: games.length === 20 ? games.at(-1).gameId - 1 : undefined,
          accountLevel: games.length > 0 ? games[0].accountLevel : undefined,
          characterCode: games.length > 0 ? games[0].characterNum : undefined,
          mmr: games.length > 0 ? games[0].mmrAfter : undefined,
          updated: result.updated,
          rank,
        },
        playerStats: await this.gameService.getUserStats(userNum),
      };
    }
    return {
      playerData: {
        view: ViewStatus.OLD,
        nickname,
        userNum,
        games: [],
      },
      playerStats: [],
    };
  }

  async getPastData(userNum: number, next: number) {
    const games = await this.gameService.getFromDB(userNum, next);
    return {
      games,
      next: games.length === 20 ? games.at(-1).gameId - 1 : undefined,
    };
  }

  async post(updatePlayerDto: UpdatePlayerDto): Promise<PlayerAllRO> {
    const { userNum, nickname } = updatePlayerDto;
    const lastGameId = await this.gameService.getLastGameId(userNum);
    let player = new Player();
    player.userNum = userNum;
    player.nickname = nickname;
    player.lastGameId = lastGameId || 0;
    player.updated = new Date();
    await this.playerRepository.updatePlayer(player);
    return await this.getRecentData(nickname, 23);
    /* const { userNum, nickname, lastGameId } = updatePlayerDto;
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
    games = await this.gameService.getFromDB(userNum, lastGameId);
    return {
      view: ViewStatus.NEW,
      nickname,
      userNum,
      games,
      updated: result.updated,
      next: result.lastGameId,
      rank,
    }; */
  }
}
