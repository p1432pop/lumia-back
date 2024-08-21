import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { GameRepository } from './game.repository';
import { AxiosService } from 'src/axios/axios.service';
import { Game } from './game.entity';
import { DataSource, QueryRunner } from 'typeorm';
import { GameDTO } from './dto/game.dto';
import { UserGamesQueryDTO } from 'src/user/dto/request/userGamesQuery.dto';
import { User } from 'src/user/entity/user.entity';
import { UserService } from 'src/user/user.service';
import { AxiosQueuePriority } from 'src/axios/axios.enum';
import { GameResponse } from 'src/axios/open-api/response';
import { plainToInstance } from 'class-transformer';
import { GameVO } from 'src/axios/open-api/vo/game.vo';
import { AppLogger } from 'src/shared/logger/logger.service';
import _ from 'lodash';

@Injectable()
export class GameService {
  private readonly RETRY_DELAY = 30 * 60 * 1000;
  private readonly CHUNK_SIZE = 200;
  private LAST_GAME_ID: number;
  constructor(
    private readonly dataSource: DataSource,
    private readonly gameRepository: GameRepository,
    private readonly axiosService: AxiosService,
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
    private readonly logger: AppLogger,
  ) {
    this.logger.setContext(GameService.name);
  }

  async interval(): Promise<void> {
    let delay = 0;
    this.LAST_GAME_ID = await this.gameRepository.getLastGameId();
    while (true) {
      const gameIds: number[] = [];
      for (let i = 1; i <= this.CHUNK_SIZE; i++) {
        gameIds.push(this.LAST_GAME_ID + i);
      }
      const gameResponses = await Promise.all(gameIds.map((gameId) => this.axiosService.getGame(gameId, { priority: AxiosQueuePriority.LOW, delay })));
      const filtered = gameResponses.filter((gameResponse): gameResponse is GameResponse => Boolean(gameResponse && gameResponse.code === 200));
      if (this.hasValidResponse(filtered)) {
        const games: Game[] = [];
        const users: User[] = [];
        filtered.forEach((gameResponse) => {
          if (gameResponse.userGames![0].matchingTeamMode === 3) {
            gameResponse.userGames!.forEach((userGame) => {
              const user = this.createUserEntity(userGame);
              const game = this.createGameEntity(userGame);
              users.push(user);
              games.push(game);
            });
          }
        });
        const uniqueUsers = this.filterUniqueUsers(users);
        const isCommit = await this.transaction(uniqueUsers, games);
        if (isCommit) {
          this.LAST_GAME_ID = filtered.at(-1)!.userGames!.at(-1)!.gameId;
          delay = 0;
        } else {
          return;
        }
      } else {
        this.logger.log('delayed');
        delay = this.RETRY_DELAY;
      }
    }
  }

  async getUserGames(query: UserGamesQueryDTO): Promise<GameDTO[]> {
    const games = await this.gameRepository.getUserGames(query);
    const dto = games.map((game) => this.entityToDTO(game));
    return dto;
  }

  async getGame(gameId: number): Promise<GameDTO[]> {
    const games = await this.gameRepository.getGame(gameId);
    const dto = games.map((game) => this.entityToDTO(game));
    return dto;
  }

  async insertGame(game: Game | Game[], qr?: QueryRunner): Promise<void> {
    await this.gameRepository.insertGame(game, qr);
  }

  private filterUniqueUsers(users: User[]): User[] {
    const recentFirst = _.reverse([...users]);
    return _.uniqBy(recentFirst, 'userNum');
  }

  private entityToDTO(game: Game): GameDTO {
    return {
      ...game,
      nickname: game.user.nickname,
    };
  }

  private createGameEntity(gameVO: GameVO): Game {
    const game = plainToInstance(Game, gameVO);
    if (gameVO.traitFirstSub.length !== 2 || gameVO.traitSecondSub.length !== 2) {
      game.traitFirstSub = [0, 0];
      game.traitSecondSub = [0, 0];
    }
    game.isRank = gameVO.seasonId ? true : false;
    return game;
  }

  private createUserEntity(gameVO: GameVO): User {
    const user = new User();
    user.userNum = gameVO.userNum;
    user.nickname = gameVO.nickname;
    if (gameVO.mmrGain === 0 && gameVO.mmrAfter === 0) {
      user.mmr = gameVO.mmrBefore ?? null;
    } else {
      user.mmr = gameVO.mmrAfter ?? null;
    }
    user.accountLevel = gameVO.accountLevel;
    return user;
  }

  /** 유효한 가장 마지막 응답의 서버 시작 시간이 30분 이상 */
  private hasValidResponse(responses: GameResponse[]): boolean {
    if (responses.length === 0) {
      return false;
    }

    const lastResponse = responses.at(-1)!;

    if (!lastResponse.userGames) {
      return false;
    }

    if (lastResponse.userGames.length === 0) {
      return false;
    }

    const startDtm = lastResponse.userGames.at(-1)!.startDtm;
    return new Date().getTime() - startDtm.getTime() > this.RETRY_DELAY;
  }

  /**
   * commit - return true
   * rollback - return false
   */
  private async transaction(users: User[], games: Game[]): Promise<boolean> {
    const qr = this.dataSource.createQueryRunner();
    await qr.connect();
    await qr.startTransaction();
    try {
      await this.userService.upsertUser(users, qr);
      await this.insertGame(games, qr);
      await qr.commitTransaction();
      this.logger.log('transaction commit');
      return true;
    } catch (err) {
      await qr.rollbackTransaction();
      this.logger.warn('transaction rollback');
      return false;
    } finally {
      await qr.release();
    }
  }
}
