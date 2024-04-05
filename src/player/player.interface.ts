import { Game } from 'src/game/game.entity';

export interface PlayerRO {
  readonly view: ViewStatus;
  readonly nickname: string;
  readonly userNum: number;
  readonly games: Game[];
  readonly accountLevel?: number;
  readonly characterCode?: number;
  readonly mmr?: number;
  readonly next?: number;
  readonly updated?: Date;
  readonly rank?: number;
}

export interface PlayerStatsRO {
  readonly characterCode: number;
  totalGames: number;
  wins: number;
  top3: number;
  averageKills: number;
  averageTeamKills: number;
  averageAssistants: number;
  averageHunts: number;
  averageRank: number;
  readonly averageGainVFCredit: number;
}

export interface PlayerAllRO {
  playerData: PlayerRO;
  playerStats: PlayerStatsRO[];
}
export enum ViewStatus {
  NEW = 'NEW',
  OLD = 'OLD',
}
