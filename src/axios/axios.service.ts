import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { Game } from 'src/game/game.entity';
import { Ranking } from 'src/rank/ranking.entity';

@Injectable()
export class AxiosService {
  private readonly option: {
    headers: { 'Content-Type': string; 'x-api-key': string };
  };
  constructor(private readonly configService: ConfigService) {
    this.option = {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': this.configService.get<string>('BSER_API_KEY'),
      },
    };
  }
  async getSeasonRanking(season: number): Promise<Ranking[]> {
    const result = await axios.get(`https://open-api.bser.io/v1/rank/top/${season}/3`, this.option);
    return await this.getUserStatsByUserNums(
      result.data.topRanks.map((user: { userNum: number }) => user.userNum),
      season,
    );
  }
  async getGamesByGameIds(gameIds: number[]): Promise<Game[]> {
    let URIs: string[] = gameIds.map((gameId) => `https://open-api.bser.io/v1/games/${gameId}`);
    let retry = 1;
    while (retry++ <= 5) {
      try {
        let res = await Promise.all(URIs.map((endpoint: string) => axios.get(endpoint, this.option)));
        let results = [];
        res.forEach((item) => {
          if (item.data.code === 200 && item.data.userGames[0].seasonId > 0) {
            item.data.userGames.forEach((user) => {
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
  }
  async getUserStatsByUserNums(userNums: number[], season: number): Promise<Ranking[]> {
    let URIs: string[] = userNums.map((userNum: number) => `https://open-api.bser.io/v1/user/stats/${userNum}/${season}`);
    let results = [];
    let chunkedURIs = this.chunkArray(URIs, 40); // Split URIs into chunks of 40

    // Create an array to hold all promises
    for (let i = 0; i < chunkedURIs.length; i++) {
      let targetURIs = chunkedURIs[i];
      console.log(new Date());
      let res = await Promise.all(targetURIs.map((endpoint: string) => axios.get(endpoint, this.option)));
      res.forEach((item) => {
        const { data } = item;
        const { userStats } = data;
        const userStat = userStats.pop();
        const { characterStats } = userStat;
        const { userNum, seasonId, nickname, rank, mmr, totalGames, top1, top3, averageRank, averageKills } = userStat;
        const characterInfo = characterStats.slice(0, 3).map((charStat: { characterCode: number; totalGames: number }) => ({
          characterCode: charStat.characterCode,
          totalGames: charStat.totalGames,
        }));
        const [character1, character2, character3] = characterInfo;
        results.push({
          userNum,
          seasonId,
          nickname,
          rank,
          mmr,
          totalGames,
          top1,
          top3,
          averageRank,
          averageKills,
          characterCode1: character1?.characterCode,
          charTotal1: character1?.totalGames,
          characterCode2: character2?.characterCode,
          charTotal2: character2?.totalGames,
          characterCode3: character3?.characterCode,
          charTotal3: character3?.totalGames,
        });
      });

      // Add delay between chunks, except for the last chunk
      if (i < chunkedURIs.length - 1) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
    }
    return results;
  }

  // Function to split an array into chunks
  chunkArray(array: string[], size: number) {
    let chunkedArray = [];
    for (let i: number = 0; i < array.length; i += size) {
      chunkedArray.push(array.slice(i, i + size));
    }
    return chunkedArray;
  }

  async getGameByGameId(gameId: number): Promise<any> {
    const result = await axios.get(`https://open-api.bser.io/v1/games/${gameId}`, this.option);
    return result.data;
  }
  async getUserNumByNickname(nickname: string): Promise<number> {
    const result = await axios.get(`https://open-api.bser.io/v1/user/nickname?query=${nickname}`, this.option);
    if (result.data.code === 404) {
      throw new NotFoundException();
    } else if (result.data.code === 200) {
      return result.data.user.userNum;
    }
  }

  async getRankByUserNum(userNum: number, season: number): Promise<number> {
    const result = await axios.get(`https://open-api.bser.io/v1/rank/${userNum}/${season}/3`, this.option);
    return result.data.userRank.rank;
  }

  async getGamesByUserNum(userNum: number, next?: number): Promise<{ userGames: Array<any>; next: number }> {
    let url = `https://open-api.bser.io/v1/user/games/${userNum}`;
    if (next) {
      url += `?next=${next}`;
    }
    const result = await axios.get(url, this.option);
    if (result.data.code === 404) {
      return {
        userGames: [],
        next: undefined,
      };
    } else if (result.data.code === 200) {
      return {
        userGames: result.data.userGames,
        next: result.data.next,
      };
    }
  }
}
