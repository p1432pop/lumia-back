import { BaseResponse } from './baseResponse.interface';

export interface UserStatResponse extends BaseResponse {
  userStats: UserStatAPI[];
}

export interface UserStatAPI {
  seasonId: number;
  userNum: number;
  matchingMode: number;
  matchingTeamMode: number;
  mmr: number;
  nickname: string;
  rank: number;
  rankSize: number;
  totalGames: number;
  totalWins: number;
  totalTeamKills: number;
  rankPercent: number;
  averageRank: number;
  averageKills: number;
  averageAssistants: number;
  averageHunts: number;
  top1: number;
  top2: number;
  top3: number;
  top5: number;
  top7: number;
  characterStats: CharacterStatAPI[];
}

export interface CharacterStatAPI {
  characterCode: number;
  totalGames: number;
  usages: number;
  maxKillings: number;
  top3: number;
  wins: number;
  top3Rate: number;
  averageRank: number;
}
