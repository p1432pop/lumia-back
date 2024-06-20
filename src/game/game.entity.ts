import { ArrayColumn, ObjectColumn } from 'src/shared/decorator/typeorm.decorator';
import { Column, Entity, PrimaryColumn } from 'typeorm';
import { Equipment } from './dto/game.dto';

@Entity('game')
export class Game {
  @PrimaryColumn()
  userNum: number;

  @PrimaryColumn()
  gameId: number;

  @Column()
  seasonId: number;

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

  @ObjectColumn({
    length: 100,
  })
  masteryLevel: object;

  @ObjectColumn({
    length: 100,
  })
  equipment: Equipment;

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

  @ObjectColumn({
    length: 80,
  })
  killMonsters: object;

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

  @ArrayColumn()
  traitFirstSub: number[];

  @ArrayColumn()
  traitSecondSub: number[];

  @Column()
  escapeState: number;

  @Column()
  tacticalSkillGroup: number;

  @Column()
  tacticalSkillLevel: number;

  @Column()
  totalGainVFCredit: number;
}
