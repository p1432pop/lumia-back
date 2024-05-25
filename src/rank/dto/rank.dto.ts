class topRank {
  userNum: number;
  nickname: string;
  mmr: number;
  totalGames: number;
  top1: number;
  top3: number;
  averageRank: number;
  averageKills: number;
  characterCode1: number;
  charTotal1: number;
  characterCode2?: number;
  charTotal2?: number;
  characterCode3?: number;
  charTotal3?: number;
}

export class RankDTO {
  topRanks: topRank[];
  updated: Date;
}
