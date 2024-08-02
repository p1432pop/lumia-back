import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { Ranking } from './ranking.entity';

@Entity('updated')
export class Updated {
  @PrimaryColumn({ type: 'smallint' })
  seasonId: number;

  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updated: Date;

  @OneToMany(() => Ranking, (ranking) => ranking.updated, { cascade: ['insert'] })
  topRanks: Ranking[];
}
