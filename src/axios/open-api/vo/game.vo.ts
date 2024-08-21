import { Equipment } from 'src/game/dto/game.dto';
import { Expose, Type } from 'class-transformer';

export class GameVO {
  @Expose()
  userNum: number;

  @Expose()
  nickname: string;

  @Expose()
  gameId: number;

  @Expose()
  seasonId: number;

  @Expose()
  matchingMode: number;

  @Expose()
  matchingTeamMode: number;

  @Expose()
  characterNum: number;

  @Expose()
  skinCode: number;

  @Expose()
  characterLevel: number;

  @Expose()
  gameRank: number;

  @Expose()
  playerKill: number;

  @Expose()
  playerAssistant: number;

  @Expose()
  monsterKill: number;

  @Expose()
  bestWeapon: number;

  @Expose()
  bestWeaponLevel: number;

  @Expose()
  @Type(() => Equipment)
  equipment: Equipment;

  @Expose()
  versionMajor: number;

  @Expose()
  versionMinor: number;

  @Expose()
  startDtm: Date;

  @Expose()
  duration: number;

  @Expose()
  mmrBefore?: number;

  @Expose()
  mmrGain?: number;

  @Expose()
  mmrAfter?: number;

  @Expose()
  damageToPlayer: number;

  @Expose()
  damageFromPlayer: number;

  @Expose()
  matchSize: number;

  @Expose()
  teamKill: number;

  @Expose()
  accountLevel: number;

  @Expose()
  traitFirstCore: number;

  @Expose()
  traitFirstSub: number[];

  @Expose()
  traitSecondSub: number[];

  @Expose()
  escapeState: number;

  @Expose()
  tacticalSkillGroup: number;

  @Expose()
  tacticalSkillLevel: number;

  @Expose()
  totalGainVFCredit: number;
}
