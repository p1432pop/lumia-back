import { Game } from 'src/game/game.entity';
import { Column, Entity, Index, OneToMany, PrimaryColumn } from 'typeorm';
import { UserSeasonStat } from './userSeasonStat.entity';

@Entity('user')
export class User {
  @PrimaryColumn({ type: 'integer' })
  userNum: number;

  /* GIN Index not supported in typeorm */
  @Index('gin_trgm_ops')
  @Column({ type: 'varchar', length: 32 })
  nickname: string;

  @Column({ type: 'timestamptz', nullable: true })
  updated: Date | null;

  @Column({ type: 'smallint', nullable: true })
  mmr: number | null;

  @Column({ type: 'smallint' })
  accountLevel: number;

  @OneToMany(() => UserSeasonStat, (userstat) => userstat.user, { cascade: ['insert'] })
  userStats: UserSeasonStat[];

  @OneToMany(() => Game, (game) => game.user)
  games: Game[];
}
