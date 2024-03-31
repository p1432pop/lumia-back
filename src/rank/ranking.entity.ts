import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('Ranking')
export class Ranking extends BaseEntity {
  @PrimaryColumn()
  userNum: number;

  @PrimaryColumn()
  seasonId: number;

  @Column()
  nickname: string;

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
  charTotal1: number;

  @Column({
    nullable: true,
    default: null,
  })
  characterCode2: number;

  @Column({
    nullable: true,
    default: null,
  })
  charTotal2: number;

  @Column({
    nullable: true,
    default: null,
  })
  characterCode3: number;

  @Column({
    nullable: true,
    default: null,
  })
  charTotal3: number;
}
