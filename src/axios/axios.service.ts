import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { Ranking2 } from 'src/rank/season2.entity';

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
  async test() {
    const result = await axios.get(`https://open-api.bser.io/v1/user/stats/2250281/21`, this.option);
    return result.data.userStats[0];
  }
  async getSeasonRanking(season: number) {
    try {
      const result = await axios.get(`https://open-api.bser.io/v1/rank/top/${season}/3`, this.option);
      return this.getUserStatsByUserNums(
        result.data.topRanks.map((user: { userNum: number }) => user.userNum),
        season,
      );
    } catch (err) {}
  }
  async getGamesByGameIds(gameIds: number[]) {
    let URIs: string[] = [];
    gameIds.forEach((gameId: number) => {
      URIs.push(`https://open-api.bser.io/v1/games/${gameId}`);
    });
    let results = [];
    let res = await Promise.all(URIs.map((endpoint: string) => axios.get(endpoint, this.option)));
    res.forEach((item) => {
      let data = item.data;
      results.push(data);
    });
    return results;
  }
  async getUserStatsByUserNums(userNums: number[], season: number) {
    let URIs: string[] = [];
    userNums.forEach((userNum: number) => {
      URIs.push(`https://open-api.bser.io/v1/user/stats/${userNum}/${season}`);
    });

    let results = [];
    let chunkedURIs = this.chunkArray(URIs, 40); // Split URIs into chunks of 40

    // Create an array to hold all promises
    for (let i = 0; i < chunkedURIs.length; i++) {
      let targetURIs = chunkedURIs[i];
      console.log(new Date());
      let res = await Promise.all(targetURIs.map((endpoint: string) => axios.get(endpoint, this.option)));
      res.forEach((item) => {
        let data = item.data.userStats[0];
        const player = new Ranking2();
        player.userNum = data.userNum;
        player.nickname = data.nickname;
        player.rank = data.rank;
        player.mmr = data.mmr;
        player.totalGames = data.totalGames;
        player.top1 = data.top1;
        player.top3 = data.top3;
        player.averageRank = data.averageRank;
        player.averageKills = data.averageKills;
        data.characterStats.forEach((item, idx) => {
          if (idx === 0) {
            player.characterCode1 = item.characterCode;
            player.char1total = item.totalGames;
          } else if (idx === 1) {
            player.characterCode2 = item.characterCode;
            player.char2total = item.totalGames;
          } else if (idx === 2) {
            player.characterCode3 = item.characterCode;
            player.char3total = item.totalGames;
          }
        });
        results.push(player);
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
    return result.data.userGames;
  }
  async getUserNumByNickname(nickname: string): Promise<number> {
    const result = await axios.get(`https://open-api.bser.io/v1/user/nickname?query=${nickname}`, this.option);
    return result.data.user.userNum;
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
    return {
      userGames: result.data.userGames,
      next: result.data.next,
    };
  }
}
