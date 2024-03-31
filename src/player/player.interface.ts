import { Game } from 'src/game/game.entity';

export interface PlayerRO {
  readonly view: number;
  readonly nickname: string;
  readonly userNum: number;
  readonly games: Game[];
  readonly lastGameId: number;
  readonly updated: Date | null;
  readonly rank: number | null;
}
