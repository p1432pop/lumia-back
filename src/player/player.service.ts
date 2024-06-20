import { Injectable } from '@nestjs/common';
import { AxiosService } from 'src/axios/axios.service';
import { PlayerRepository } from './player.repository';
import { GameService } from 'src/game/game.service';
import { UpdatePlayerDto } from './dto/update-player.dto';
import { PlayerDTO, PlayerPastDTO, ViewStatus } from './dto/player.dto';
import { Game } from 'src/game/game.entity';

@Injectable()
export class PlayerService {
  private readonly MAX_LENGTH = 20;
  constructor(
    private readonly axiosService: AxiosService,
    private readonly playerRepository: PlayerRepository,
    private readonly gameService: GameService,
  ) {}

  renewable(updated: Date): ViewStatus {
    if (new Date().getTime() - updated.getTime() > 5 * 60 * 1000) return ViewStatus.OLD;
    return ViewStatus.NEW;
  }

  next(games: Game[]): number | undefined {
    if (games.length === this.MAX_LENGTH) return games[this.MAX_LENGTH - 1].gameId - 1;
    return undefined;
  }
  async getRecentData(nickname: string, seasonId: number): Promise<PlayerDTO> {
    const userNum = await this.axiosService.getUserNumByNickname(nickname);
    const result = await this.playerRepository.getPlayerByUserNum(userNum);
    if (result) {
      const games = await this.gameService.getFromDB(userNum, seasonId, result.lastGameId);
      const rank = await this.axiosService.getRankByUserNum(userNum, seasonId);
      return {
        playerData: {
          view: this.renewable(result.updated),
          nickname,
          userNum,
          games,
          next: this.next(games),
          accountLevel: games[0]?.accountLevel,
          characterCode: games[0]?.characterNum,
          mmr: games[0]?.mmrAfter,
          updated: result.updated,
          rank,
        },
        playerStats: await this.gameService.getUserStats(userNum, seasonId),
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

  async getPastData(userNum: number, seasonId: number, next: number): Promise<PlayerPastDTO> {
    const games = await this.gameService.getFromDB(userNum, seasonId, next);
    return {
      games,
      next: this.next(games),
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
