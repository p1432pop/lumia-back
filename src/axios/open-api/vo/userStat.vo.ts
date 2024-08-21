import { Expose, Type } from 'class-transformer';
import { CharacterStatVO } from './characterStat.vo';

export class UserStatVO {
  @Expose()
  seasonId: number;

  @Expose()
  userNum: number;

  @Expose()
  matchingMode: number;

  @Expose()
  matchingTeamMode: number;

  @Expose()
  mmr: number;

  @Expose()
  nickname: string;

  @Expose()
  rank: number;

  @Expose()
  rankSize: number;

  @Expose()
  totalGames: number;

  @Expose()
  totalWins: number;

  @Expose()
  totalTeamKills: number;

  @Expose()
  rankPercent: number;

  @Expose()
  averageRank: number;

  @Expose()
  averageKills: number;

  @Expose()
  averageAssistants: number;

  @Expose()
  averageHunts: number;

  @Expose()
  top1: number;

  @Expose()
  top2: number;

  @Expose()
  top3: number;

  @Expose()
  top5: number;

  @Expose()
  top7: number;

  @Expose()
  @Type(() => CharacterStatVO)
  characterStats: CharacterStatVO[];
}
