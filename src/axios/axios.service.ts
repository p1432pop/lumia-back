import { Injectable, InternalServerErrorException, Type } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios, { AxiosInstance } from 'axios';
import { Game } from 'src/game/game.entity';
import { Ranking } from 'src/rank/entity/ranking.entity';
import { UserSeasonStat } from 'src/user/entity/userSeasonStat.entity';
import { GameAPI, GameResponse } from './open-api/game.interface';
import { BaseResponse } from './open-api/baseResponse.interface';
import { ItemArmorResponse, ItemConsumableResponse, ItemWeaponResponse } from './open-api/item.interface';
import { RankResponse } from './open-api/rank.interface';
import { UserStatResponse } from './open-api/userStat.interface';
import { NewsResponse } from './open-api/news.interface';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class AxiosService {
  private readonly axiosInstance: AxiosInstance;
  constructor(private readonly configService: ConfigService) {
    this.axiosInstance = axios.create({
      baseURL: 'https://open-api.bser.io',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': this.configService.get<string>('BSER_API_KEY'),
      },
    });
  }

  async fetchData<T extends BaseResponse>(url: string, classType: Type<T>): Promise<T | null> {
    let retry = 1;
    while (retry++ <= 5) {
      try {
        const result = await this.axiosInstance.get<T>(url);
        if (result.data.code === 200) {
          return plainToInstance(classType, result.data);
        }
        if (result.data.code === 404) {
          return null;
        }
        return null;
      } catch (err) {
        // 408 request timeout
        // 429 too many request
        console.log(err);
        await new Promise((resolve) => setTimeout(resolve, 1000 * retry));
      }
    }
    return null;
  }

  async getItemWeapon(): Promise<ItemWeaponResponse | null> {
    return await this.fetchData<ItemWeaponResponse>('/v2/data/ItemWeapon');
  }

  async getItemArmor(): Promise<ItemArmorResponse | null> {
    return await this.fetchData<ItemArmorResponse>('/v2/data/ItemArmor');
  }

  async getItemConsumable(): Promise<ItemConsumableResponse | null> {
    return await this.fetchData<ItemConsumableResponse>('/v2/data/ItemConsumable');
  }

  async getGame(gameId: number): Promise<GameResponse | null> {
    return await this.fetchData<GameResponse>(`/v1/games/${gameId}`);
  }

  async getTopRanks(seasonId: number): Promise<RankResponse | null> {
    return await this.fetchData<RankResponse>(`/v1/rank/top/${seasonId}/3`);
  }

  async getUserStat(userNum: number, seasonId: number): Promise<UserStatResponse | null> {
    return await this.fetchData<UserStatResponse>(`/v1/user/stats/${userNum}/${seasonId}`);
  }

  async getNews(page: number = 1): Promise<NewsResponse | null> {
    try {
      const result = await axios.get<NewsResponse>(`https://playeternalreturn.com/api/v1/posts/news?page=${page}`, {
        headers: {
          'Accept-Language': 'ko',
        },
      });
      return result.data;
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  /* async test(userNums: number[]) {
    let URIs: string[] = userNums.map((userNum) => `/user/games/${userNum}`);
    let res = await Promise.all(URIs.map((endpoint: string) => this.axiosInstance.get(endpoint)));
    let results: string[] = [];
    res.forEach((item) => {
      results.push(item.data.userGames[0].nickname);
    });
    return results;
  } */
  async getSeasonRanking(season: number): Promise<Ranking[]> {
    const result = await this.axiosInstance.get(`/rank/top/${season}/3`);
    const userNums = result.data.topRanks.map((user: { userNum: number }) => user.userNum);
    return await this.getUserStatsByUserNums(userNums, season);
  }

  async getGamesByGameIds(gameIds: number[]): Promise<GameAPI[]> {
    let URIs: string[] = gameIds.map((gameId) => `/games/${gameId}`);
    let retry = 1;
    while (retry++ <= 5) {
      try {
        let res = await Promise.all(URIs.map((endpoint: string) => this.axiosInstance.get(endpoint)));
        let results: GameAPI[] = [];
        res.forEach((item) => {
          if (item.data.code === 200 && item.data.userGames[0].matchingTeamMode == 3) {
            item.data.userGames.forEach((user) => {
              if (user.traitFirstSub.length !== 2 || user.traitSecondSub.length !== 2) {
                user.traitFirstSub = [0, 0];
                user.traitSecondSub = [0, 0];
              }
              user.isRank = user.seasonId ? true : false;
              results.push(user);
            });
          }
        });
        return results;
      } catch (err) {
        console.log('ETIMEDOUT');
        await new Promise((resolve) => setTimeout(resolve, 1000 * retry));
      }
    }
    throw new InternalServerErrorException();
  }

  async getUserStatsByUserNum(userNum: number): Promise<UserSeasonStat[]> {
    let URIs: string[] = [];
    for (let i = 1; i < 25; i = i + 2) {
      URIs.push(`/user/stats/${userNum}/${i}`);
    }
    let results: UserSeasonStat[] = [];
    let res = await Promise.all(URIs.map((endpoint: string) => this.axiosInstance.get(endpoint)));
    res.forEach((item) => {
      const { data } = item;
      console.log(data);
      if (data.code === 200) {
        const { userStats } = data;
        userStats.forEach((userStat) => {
          const entity = new UserSeasonStat();
          entity.userNum = userNum;
          entity.seasonId = userStat.seasonId;
          entity.matchingTeamMode = userStat.matchingTeamMode;
          entity.mmr = userStat.mmr;
          results.push(entity);
        });
      }
    });
    return results;
  }

  async getUserStatsByUserNums(userNums: number[], season: number): Promise<Ranking[]> {
    let URIs: string[] = userNums.map((userNum: number) => `/user/stats/${userNum}/${season}`);
    let results: Ranking[] = [];
    let chunkedURIs = this.chunkArray(URIs, 20);

    for (let i = 0; i < chunkedURIs.length; i++) {
      let targetURIs = chunkedURIs[i];
      let res = await Promise.all(targetURIs.map((endpoint: string) => this.axiosInstance.get(endpoint)));
      res.forEach((item) => {
        const userStat = item.data.userStats.pop();
        results.push(userStat);
      });
      if (i < chunkedURIs.length - 1) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
    }
    return results;
  }

  private chunkArray(array: string[], size: number): string[][] {
    let chunkedArray: string[][] = [];
    for (let i: number = 0; i < array.length; i += size) {
      chunkedArray.push(array.slice(i, i + size));
    }
    return chunkedArray;
  }

  async getGameByGameId(gameId: number): Promise<Game[]> {
    const result = await this.axiosInstance.get(`/games/${gameId}`);
    return result.data;
  }

  /* async getUserNumByNickname(nickname: string): Promise<number | null> {
    const result = await this.axiosInstance.get(`/user/nickname?query=${nickname}`);
    if (result.data.code === 200) {
      return result.data.user.userNum;
    }
    return null;
  } */

  /* async getRankByUserNum(userNum: number, seasonId: number): Promise<number> {
    const result = await this.axiosInstance.get(`/rank/${userNum}/${seasonId}/3`);
    return result.data.userRank.rank;
  } */
}
