import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';

export class Equipment {
  @Expose()
  '0'?: number;

  @Expose()
  '1'?: number;

  @Expose()
  '2'?: number;

  @Expose()
  '3'?: number;

  @Expose()
  '4'?: number;
}

export class GameDTO {
  @ApiProperty({
    description: 'user number',
    type: 'number',
  })
  @Expose()
  userNum: number;

  @ApiProperty({
    description: 'game id',
    type: 'number',
  })
  @Expose()
  gameId: number;

  @Expose()
  versionMajor: number;

  @Expose()
  versionMinor: number;

  @Expose()
  characterNum: number;

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

  //nested response를 위한 type 선언
  @Type(() => Equipment)
  @Expose()
  equipment: Equipment;

  @Expose()
  startDtm: string;

  @Expose()
  duration: number;

  @Expose()
  mmrBefore: number;

  @Expose()
  mmrGain: number;

  @Expose()
  mmrAfter: number;

  @Expose()
  victory: number;

  @Expose()
  damageToPlayer: number;

  @Expose()
  giveUp: number;

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
