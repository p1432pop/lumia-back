import { Expose } from 'class-transformer';

export class CharacterStatVO {
  @Expose()
  characterCode: number;

  @Expose()
  totalGames: number;

  @Expose()
  usages: number;

  @Expose()
  maxKillings: number;

  @Expose()
  top3: number;

  @Expose()
  wins: number;

  @Expose()
  top3Rate: number;

  @Expose()
  averageRank: number;
}
