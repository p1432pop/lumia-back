import { forwardRef, Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { GameRepository } from './game.repository';
import { AxiosService } from 'src/axios/axios.service';
import { Game } from './game.entity';
import { DataSource } from 'typeorm';
import { GameDTO } from './dto/game.dto';
import { UserGamesQueryDTO } from 'src/user/dto/request/userGamesQuery.dto';
import { User } from 'src/user/entity/user.entity';
import { UserService } from 'src/user/user.service';

@Injectable()
export class GameService implements OnModuleInit {
  private readonly RETRY_TIME: number = 30 * 60 * 1000;
  private LAST_GAME_ID: number;
  constructor(
    private readonly dataSource: DataSource,
    private readonly gameRepository: GameRepository,
    private readonly axiosService: AxiosService,
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
  ) {}
  async onModuleInit() {
    //this.interval();
    // req.data.code === 200 or 404
    // 게임 중 한 팀이라도 끝난 경우 200, 그 외 404
    // 게임중이어도 끝나지 않았으면 404
    // 200개씩 받아서
    // status가 200인
    // matchSize가 userGames.length와 같은지 확인
    // arr = [], maxSize = 100
    //
    /* while (true) {
      let gameIds = [];
      for (let i = 1; i <= 100; i++) {
        gameIds.push(this.LAST_GAME_ID + i);
      }
      let results = [];
      for (let i = 0; i < 10; i++) {
        const result = await this.axiosService.getGamesByGameIds2(gameIds.slice(i * 10, (i + 1) * 10));
        await new Promise((resolve) => setTimeout(resolve, 1000));
        results.push(...result);
      }
      while (true) {
        let exist = false;
        let toDelay = false;
        for (let result of results) {
          if (result.data.code === 200) {
            if (result.data.userGames[0].matchSize !== result.data.userGames.length) {
              toDelay = true;
            }
            exist = true;
          }
        }
        if (exist && toDelay) {
          await new Promise((resolve) => setTimeout(resolve, this.RETRY_TIME));
        } else if (exist) {
          await this.insertGames(results);
        }
      }
    } */
  }
  async interval() {
    this.LAST_GAME_ID = (await this.gameRepository.getLastGameId()) + 1;
    while (true) {
      let gameIds: number[] = [];
      for (let i = 0; i < 45; i++) {
        gameIds.push(this.LAST_GAME_ID + i);
      }
      let games = await this.axiosService.getGamesByGameIds(gameIds);
      this.LAST_GAME_ID += 45;
      let users: User[] = [];
      for (let i = 0; i < games.length; i++) {
        let user = new User();
        user.userNum = games[i].userNum;
        user.nickname = games[i].nickname;
        if (games[i].isRank) {
          if (games[i].mmrGain === 0 && games[i].mmrAfter === 0) {
            user.mmr = games[i].mmrBefore;
          } else {
            user.mmr = games[i].mmrAfter;
          }
        }
        user.accountLevel = games[i].accountLevel;
        users.push(user);
      }
      const userMap = new Map<number, User>();
      for (const user of users) {
        userMap.set(user.userNum, user);
      }
      const uniqueUsers = Array.from(userMap.values());
      let start = new Date();
      await this.userService.upsertUsers(uniqueUsers);
      await this.insertGames(games);
      let end = new Date();
      console.log(end.getTime() - start.getTime());
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }
  async getFromAPI(gameId: number) {
    return await this.axiosService.getGameByGameId(gameId);
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

  async insertGames(games: Game[]): Promise<void> {
    await this.gameRepository.insertGames(games);
  }

  private entityToDTO(game: Game): GameDTO {
    return {
      ...game,
      nickname: game.user.nickname,
    };
  }
}
