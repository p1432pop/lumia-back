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
  async getSeasonRanking(season: number) {
    const result = await axios.get(`https://open-api.bser.io/v1/rank/top/${season}/3`, this.option);
    return await this.getUserStatsByUserNums(
      result.data.topRanks.map((user: { userNum: number }) => user.userNum),
      season,
    );
  }
  async getGamesByGameIds(gameIds: number[]) {
    let URIs: string[] = [];
    gameIds.forEach((gameId: number) => {
      URIs.push(`https://open-api.bser.io/v1/games/${gameId}`);
    });
    let results = [];
    let res = await Promise.all(URIs.map((endpoint: string) => axios.get(endpoint, this.option)));
    res.forEach((item) => {
      if (item.data.code === 200 && item.data.userGames[0].seasonId > 0) {
        item.data.userGames.forEach((user) => {
          let game = new Game();
          game.userNum = user.userNum;
          game.gameId = user.gameId;
          game.versionMajor = user.versionMajor;
          game.versionMinor = user.versionMinor;
          game.characterNum = user.characterNum;
          game.characterLevel = user.characterLevel;
          game.gameRank = user.gameRank;
          game.playerKill = user.playerKill;
          game.playerAssistant = user.playerAssistant;
          game.monsterKill = user.monsterKill;
          game.bestWeapon = user.bestWeapon;
          game.bestWeaponLevel = user.bestWeaponLevel;
          game.masteryLevel = JSON.stringify(user.masteryLevel);
          game.equipment = JSON.stringify(user.equipment);
          game.startDtm = user.startDtm;
          game.duration = user.duration;
          game.mmrBefore = user.mmrBefore;
          game.mmrAfter = user.mmrAfter;
          game.mmrGain = user.mmrGain;
          game.victory = user.victory;
          game.damageFromMonster = user.damageFromMonster;
          game.damageFromPlayer = user.damageFromPlayer;
          game.damageToMonster = user.damageToMonster;
          game.damageToPlayer = user.damageToPlayer;
          game.killMonsters = JSON.stringify(user.killMonsters);
          game.healAmount = user.healAmount;
          game.teamRecover = user.teamRecover;
          game.addSurveillanceCamera = user.addSurveillanceCamera;
          game.addTelephotoCamera = user.addTelephotoCamera;
          game.removeSurveillanceCamera = user.removeSurveillanceCamera;
          game.removeTelephotoCamera = user.removeTelephotoCamera;
          game.giveUp = user.giveUp;
          game.matchSize = user.matchSize;
          game.teamKill = user.teamKill;
          game.accountLevel = user.accountLevel;
          game.traitFirstCore = user.traitFirstCore;
          game.traitFirstSub = JSON.stringify(user.traitFirstSub);
          game.traitSecondSub = JSON.stringify(user.traitSecondSub);
          game.escapeState = user.escapeState;
          game.tacticalSkillGroup = user.tacticalSkillGroup;
          game.tacticalSkillLevel = user.tacticalSkillLevel;
          game.totalGainVFCredit = user.totalGainVFCredit;
          results.push(game);
        });
      }
    });
    return results;
  }
  async getUserStatsByUserNums(userNums: number[], season: number): Promise<Ranking[]> {
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
        const player = new Ranking();
        player.userNum = data.userNum;
        player.seasonId = data.seasonId;
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
            player.charTotal1 = item.totalGames;
          } else if (idx === 1) {
            player.characterCode2 = item.characterCode;
            player.charTotal2 = item.totalGames;
          } else if (idx === 2) {
            player.characterCode3 = item.characterCode;
            player.charTotal3 = item.totalGames;
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

  async getGamesByUserNum(userNum: number, next?: number): Promise<{ userGames: Array<Object>; next: number }> {
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
