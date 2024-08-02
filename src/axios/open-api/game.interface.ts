import { Equipment } from 'src/game/dto/game.dto';
import { BaseResponse } from './baseResponse.interface';

export interface GameResponse extends BaseResponse {
  userGames: GameAPI[];
}

export interface GameAPI {
  userNum: number;
  nickname: string;
  gameId: number;
  seasonId: number;
  matchingMode: number;
  matchingTeamMode: number;
  characterNum: number;
  skinCode: number;
  characterLevel: number;
  gameRank: number;
  playerKill: number;
  playerAssistant: number;
  monsterKill: number;
  bestWeapon: number;
  bestWeaponLevel: number;
  masteryLevel: object;
  equipment: Equipment;
  versionMajor: number;
  versionMinor: number;
  startDtm: string;
  duration: number;
  mmrBefore?: number;
  mmrGain?: number;
  mmrAfter?: number;
  damageToPlayer: number;
  damageFromPlayer: number;
  matchSize: number;
  teamKill: number;
  accountLevel: number;
  traitFirstCore: number;
  traitFirstSub: number[];
  traitSecondSub: number[];
  escapeState: number;
  tacticalSkillGroup: number;
  tacticalSkillLevel: number;
  totalGainVFCredit: number;
}
