import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('Ranking2')
export class Ranking2 extends BaseEntity {
  @PrimaryColumn()
  userNum: number;

  @Column()
  nickname: string;

  @Column()
  rank: number;

  @Column()
  mmr: number;

  @Column()
  totalGames: number;

  @Column({
    type: 'float',
  })
  top1: number;

  @Column({
    type: 'float',
  })
  top3: number;

  @Column({
    type: 'float',
  })
  averageRank: number;

  @Column({
    type: 'float',
  })
  averageKills: number;

  @Column()
  characterCode1: number;

  @Column()
  char1total: number;

  @Column({
    nullable: true,
    default: null,
  })
  characterCode2: number;

  @Column({
    nullable: true,
    default: null,
  })
  char2total: number;

  @Column({
    nullable: true,
    default: null,
  })
  characterCode3: number;

  @Column({
    nullable: true,
    default: null,
  })
  char3total: number;
}
