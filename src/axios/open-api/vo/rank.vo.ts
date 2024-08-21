import { Expose } from 'class-transformer';

export class RankVO {
  @Expose()
  userNum: number;

  @Expose()
  nickname: string;

  @Expose()
  rank: number;

  @Expose()
  mmr: number;
}
