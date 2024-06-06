import { Injectable } from '@nestjs/common';
import { AxiosService } from 'src/axios/axios.service';
import { PlayerRepository } from './player.repository';
import { GameService } from 'src/game/game.service';
import { UpdatePlayerDto } from './dto/update-player.dto';
import { PlayerDTO, PlayerPastDTO, ViewStatus } from './dto/player.dto';

@Injectable()
export class PlayerService {
  private readonly MAX_LENGTH = 20;
  constructor(
    private readonly axiosService: AxiosService,
    private readonly playerRepository: PlayerRepository,
    private readonly gameService: GameService,
  ) {}

  renewable(updated: Date): boolean {
    return new Date().getTime() - updated.getTime() > 5 * 60 * 1000;
  }

  async getRecentData(nickname: string, seasonId: number): Promise<PlayerDTO> {
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
          next: games.length === this.MAX_LENGTH ? games[this.MAX_LENGTH - 1].gameId - 1 : undefined,
          accountLevel: games[0]?.accountLevel,
          characterCode: games[0]?.characterNum,
          mmr: games[0]?.mmrAfter,
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

  async getPastData(userNum: number, next: number): Promise<PlayerPastDTO> {
    const games = await this.gameService.getFromDB(userNum, next);
    return {
      games,
      next: games.length === this.MAX_LENGTH ? games[this.MAX_LENGTH - 1].gameId - 1 : undefined,
    };
  }

  async post(updatePlayerDto: UpdatePlayerDto): Promise<PlayerDTO> {
    const { userNum, nickname } = updatePlayerDto;
    const lastGameId = await this.gameService.getLastGameId(userNum);
    await this.playerRepository.updatePlayer({
      userNum,
      nickname,
      lastGameId,
      updated: new Date(),
    });
    return await this.getRecentData(nickname, 23);
  }
}
