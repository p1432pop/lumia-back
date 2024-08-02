import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm';
import { CharacterStat } from './characterStat.entity';
import { Updated } from './updated.entity';
import { NumericColumn } from 'src/shared/decorator/typeorm.decorator';

@Entity('ranking')
export class Ranking {
  @PrimaryColumn({ type: 'smallint' })
  seasonId: number;

  @PrimaryColumn({ type: 'integer' })
  userNum: number;

  @Column({ type: 'varchar', length: 32 })
  nickname: string;

  @Column({ type: 'smallint' })
  mmr: number;

  @Column({ type: 'smallint' })
  totalGames: number;

  @NumericColumn({ precision: 3, scale: 2 })
  top1: number;

  @NumericColumn({ precision: 3, scale: 2 })
  top3: number;

  @NumericColumn({ precision: 3, scale: 2 })
  averageRank: number;

  @NumericColumn({ precision: 4, scale: 2 })
  averageKills: number;

  @OneToMany(() => CharacterStat, (characterstat) => characterstat.ranking, { cascade: ['insert'] })
  characterStats: CharacterStat[];

  @ManyToOne(() => Updated, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'seasonId', referencedColumnName: 'seasonId' })
  updated: Updated;
}
