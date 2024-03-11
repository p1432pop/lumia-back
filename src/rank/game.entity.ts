import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('game')
export class Game extends BaseEntity {
  @PrimaryColumn()
  userNum: number;

  @PrimaryColumn()
  gameId: number;

  @Column()
  versionMajor: number;

  @Column()
  versionMinor: number;

  @Column()
  characterNum: number;

  @Column()
  characterLevel: number;

  @Column()
  gameRank: number;

  @Column()
  playerKill: number;

  @Column()
  playerAssistant: number;

  @Column()
  monsterKill: number;

  @Column()
  bestWeapon: number;

  @Column()
  bestWeaponLevel: number;

  @Column({
    length: 100,
  })
  masteryLevel: string;

  @Column({
    length: 100,
  })
  equipment: string;

  @Column({
    length: 30,
  })
  startDtm: string;

  @Column()
  duration: number;

  @Column()
  mmrBefore: number;

  @Column()
  mmrGain: number;

  @Column()
  mmrAfter: number;

  @Column()
  victory: number;

  @Column()
  damageToPlayer: number;

  @Column()
  damageFromPlayer: number;

  @Column()
  damageToMonster: number;

  @Column()
  damageFromMonster: number;

  @Column({
    length: 60,
  })
  killMonsters: string;

  @Column()
  healAmount: number;

  @Column()
  teamRecover: number;

  @Column()
  addSurveillanceCamera: number;

  @Column()
  addTelephotoCamera: number;

  @Column()
  removeSurveillanceCamera: number;

  @Column()
  removeTelephotoCamera: number;

  @Column()
  giveUp: number;

  @Column()
  matchSize: number;

  @Column()
  teamKill: number;

  @Column()
  accountLevel: number;

  @Column()
  traitFirstCore: number;

  @Column({
    length: 30,
  })
  traitFirstSub: string;

  @Column({
    length: 30,
  })
  traitSecondSub: string;

  @Column()
  escapeState: number;

  @Column()
  tacticalSkillGroup: number;

  @Column()
  tacticalSkillLevel: number;

  @Column()
  totalGainVFCredit: number;
}
