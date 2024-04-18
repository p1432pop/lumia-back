import { Injectable, OnModuleInit } from '@nestjs/common';
import { GameRepository } from './game.repository';
import { AxiosService } from 'src/axios/axios.service';
import { Game } from './game.entity';
import { readFileSync, writeFileSync } from 'fs';

@Injectable()
export class GameService implements OnModuleInit {
  private LAST_GAME_ID: number;
  constructor(
    private readonly gameRepository: GameRepository,
    private readonly axiosService: AxiosService,
  ) {
    const data = readFileSync('src/game/data.json');
    this.LAST_GAME_ID = JSON.parse(data.toString()).LAST_GAME_ID;
  }
  async onModuleInit() {
    /* while (true) {
      console.log(new Date());
      let gameIds = [];
      for (let i = 0; i < 45; i++) {
        gameIds.push(this.LAST_GAME_ID + i);
      }
      let games = await this.axiosService.getGamesByGameIds(gameIds);
      this.LAST_GAME_ID += 45;
      await this.insertGames(games);
      await new Promise((resolve) => setTimeout(resolve, 1000));
    } */
  }
  async getFromAPI(gameId: number) {
    return await this.axiosService.getGameByGameId(gameId);
  }
  async getFromDB(userNum: number, next: number): Promise<Game[]> {
    return await this.gameRepository.getGamesByUserNum(userNum, next);
  }
  async getGameByGameId(gameId: number): Promise<Game[]> {
    return await this.gameRepository.getGameByGameId(gameId);
  }
  async getUserStats(userNum: number) {
    const result = await this.gameRepository.getUserStats(userNum);
    return result;
  }
  async getLastGameId(userNum: number): Promise<number> {
    return await this.gameRepository.getLastGameId(userNum);
  }
  async insertGames(games): Promise<void> {
    this.gameRepository.insertGames(games.map((game) => this.toGameEntity(game)));
  }
  toGameEntity(game) {
    const {
      userNum,
      gameId,
      versionMajor,
      versionMinor,
      characterNum,
      characterLevel,
      gameRank,
      playerKill,
      playerAssistant,
      monsterKill,
      bestWeapon,
      bestWeaponLevel,
      startDtm,
      duration,
      mmrBefore,
      mmrAfter,
      mmrGain,
      victory,
      damageFromMonster,
      damageFromPlayer,
      damageToMonster,
      damageToPlayer,
      healAmount,
      teamRecover,
      addSurveillanceCamera,
      addTelephotoCamera,
      removeSurveillanceCamera,
      removeTelephotoCamera,
      giveUp,
      matchSize,
      teamKill,
      accountLevel,
      traitFirstCore,
      escapeState,
      tacticalSkillGroup,
      tacticalSkillLevel,
      totalGainVFCredit,
    } = game;
    const masteryLevel = JSON.stringify(game.masteryLevel);
    const equipment = JSON.stringify(game.equipment);
    const killMonsters = JSON.stringify(game.killMonsters);
    const traitFirstSub = JSON.stringify(game.traitFirstSub);
    const traitSecondSub = JSON.stringify(game.traitSecondSub);
    return {
      userNum,
      gameId,
      versionMajor,
      versionMinor,
      characterNum,
      characterLevel,
      gameRank,
      playerKill,
      playerAssistant,
      monsterKill,
      bestWeapon,
      bestWeaponLevel,
      startDtm,
      duration,
      mmrBefore,
      mmrAfter,
      mmrGain,
      victory,
      damageFromMonster,
      damageFromPlayer,
      damageToMonster,
      damageToPlayer,
      healAmount,
      teamRecover,
      addSurveillanceCamera,
      addTelephotoCamera,
      removeSurveillanceCamera,
      removeTelephotoCamera,
      giveUp,
      matchSize,
      teamKill,
      accountLevel,
      traitFirstCore,
      escapeState,
      tacticalSkillGroup,
      tacticalSkillLevel,
      totalGainVFCredit,
      masteryLevel,
      equipment,
      killMonsters,
      traitFirstSub,
      traitSecondSub,
    };
  }
}
