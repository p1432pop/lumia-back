import { Injectable } from '@nestjs/common';
import { GameRepository } from './game.repository';
import { AxiosService } from 'src/axios/axios.service';
import { Game } from './game.entity';

@Injectable()
export class GameService {
  constructor(
    private readonly gameRepository: GameRepository,
    private readonly axiosService: AxiosService,
  ) {}
  async getFromAPI(gameId: number) {
    return await this.axiosService.getGameByGameId(gameId);
  }
  async getFromDB(userNum: number) {
    return await this.gameRepository.get(userNum);
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
