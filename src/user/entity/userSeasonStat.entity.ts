import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { User } from './user.entity';

@Entity('userStat')
export class UserSeasonStat {
  @PrimaryColumn({ type: 'integer' })
  userNum: number;

  @PrimaryColumn({ type: 'smallint' })
  seasonId: number;

  @PrimaryColumn({ type: 'smallint' })
  matchingTeamMode: number;

  @Column({ type: 'smallint' })
  mmr: number;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userNum', referencedColumnName: 'userNum' })
  user: User;
}
