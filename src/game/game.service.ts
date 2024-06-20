import { Injectable, OnModuleInit } from '@nestjs/common';
import { GameRepository } from './game.repository';
import { AxiosService } from 'src/axios/axios.service';
import { Game } from './game.entity';
import { DataSource } from 'typeorm';
import { GameDTO } from './dto/game.dto';
import { CharacterStats } from 'src/player/dto/player.dto';

@Injectable()
export class GameService implements OnModuleInit {
  private readonly RETRY_TIME: number = 30 * 60 * 1000;
  private LAST_GAME_ID: number = 35259996;
  constructor(
    private readonly dataSource: DataSource,
    private readonly gameRepository: GameRepository,
    private readonly axiosService: AxiosService,
  ) {}
  async onModuleInit() {
    this.LAST_GAME_ID = (await this.gameRepository.getTotalLastGameId()) + 1;
    console.log(this.LAST_GAME_ID);
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
    while (true) {
      console.log(new Date());
      let gameIds: number[] = [];
      for (let i = 0; i < 45; i++) {
        gameIds.push(this.LAST_GAME_ID + i);
      }
      let games = await this.axiosService.getGamesByGameIds(gameIds);
      this.LAST_GAME_ID += 45;
      await this.insertGames(games);
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }
  async getFromAPI(gameId: number) {
    return await this.axiosService.getGameByGameId(gameId);
  }
  async getFromDB(userNum: number, seasonId: number, next: number): Promise<Game[]> {
    return await this.gameRepository.getGamesByUserNum(userNum, seasonId, next);
  }
  async getGameByGameId(gameId: number): Promise<GameDTO[]> {
    return await this.gameRepository.getGameByGameId(gameId);
  }
  async getUserStats(userNum: number, seasonId: number): Promise<CharacterStats[]> {
    return await this.gameRepository.getUserStats(userNum, seasonId);
  }
  async getLastGameId(userNum: number): Promise<number> {
    return await this.gameRepository.getPlayerLastGameId(userNum);
  }
  async insertGames(games): Promise<void> {
    await this.gameRepository.insertGames(games);
  }
}
