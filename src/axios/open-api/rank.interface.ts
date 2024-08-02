import { BaseResponse } from './baseResponse.interface';

export interface RankResponse extends BaseResponse {
  topRanks: RankAPI[];
}

export interface RankAPI {
  userNum: number;
  nickname: string;
  rank: number;
  mmr: number;
  userEmblems: Array<any>;
}
