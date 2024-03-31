import { Ranking } from './ranking.entity';

export interface RankRO {
  readonly data: Ranking[];
  readonly updated: Date;
}
