import { ArrayColumn, ObjectColumn } from 'src/shared/decorator/typeorm.decorator';
import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Equipment } from './dto/game.dto';
import { User } from 'src/user/entity/user.entity';

@Entity('game')
export class Game {
  @PrimaryColumn({ type: 'integer' })
  userNum: number;

  /* Index order desc not supported in typeorm */
  @Index('gameId_idx')
  @PrimaryColumn({ type: 'integer' })
  gameId: number;

  @PrimaryColumn({ type: 'integer' })
  versionMajor: number;

  @PrimaryColumn({ type: 'integer' })
  versionMinor: number;

  @Column({ type: 'boolean' })
  isRank: boolean;

  @Column({ type: 'smallint' })
  characterNum: number;

  @Column({ type: 'smallint' })
  characterLevel: number;

  @Column({ type: 'smallint' })
  gameRank: number;

  @Column({ type: 'smallint' })
  playerKill: number;

  @Column({ type: 'smallint' })
  playerAssistant: number;

  @Column({ type: 'smallint' })
  monsterKill: number;

  @Column({ type: 'smallint' })
  bestWeapon: number;

  @ObjectColumn({ length: 100 })
  equipment: Equipment;

  @Column({ type: 'timestamptz' })
  startDtm: Date;

  @Column({ type: 'smallint' })
  duration: number;

  @Column({ type: 'smallint', nullable: true })
  mmrBefore: number | null;

  @Column({ type: 'smallint', nullable: true })
  mmrGain: number | null;

  @Column({ type: 'smallint', nullable: true })
  mmrAfter: number | null;

  @Column({ type: 'integer' })
  damageToPlayer: number;

  @Column({ type: 'integer' })
  damageFromPlayer: number;

  @Column({ type: 'smallint' })
  matchSize: number;

  @Column({ type: 'smallint' })
  teamKill: number;

  @Column({ type: 'smallint' })
  accountLevel: number;

  @Column({ type: 'integer' })
  traitFirstCore: number;

  @ArrayColumn({ length: 30 })
  traitFirstSub: number[];

  @ArrayColumn({ length: 30 })
  traitSecondSub: number[];

  @Column({ type: 'smallint' })
  escapeState: number;

  @Column({ type: 'smallint' })
  tacticalSkillGroup: number;

  @Column({ type: 'smallint' })
  tacticalSkillLevel: number;

  @Column({ type: 'smallint' })
  totalGainVFCredit: number;

  //User entity will be inserted or updated automatically, when Game entity was inserted
  @ManyToOne(() => User, { onDelete: 'CASCADE', cascade: ['insert', 'update'] })
  @JoinColumn({ name: 'userNum', referencedColumnName: 'userNum' })
  user: User;
}
