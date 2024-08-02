import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Ranking } from './ranking.entity';

@Entity('characterStat')
export class CharacterStat {
  @PrimaryColumn({ type: 'smallint' })
  seasonId: number;

  @PrimaryColumn({ type: 'integer' })
  userNum: number;

  @PrimaryColumn({ type: 'smallint' })
  characterCode: number;

  @Column({ type: 'smallint' })
  totalGames: number;

  @Column({ type: 'smallint' })
  wins: number;

  @Column({ type: 'smallint' })
  top3: number;

  @ManyToOne(() => Ranking, (ranking) => ranking.characterStats, { onDelete: 'CASCADE' })
  @JoinColumn([
    { name: 'seasonId', referencedColumnName: 'seasonId' },
    { name: 'userNum', referencedColumnName: 'userNum' },
  ])
  ranking: Ranking;
}
