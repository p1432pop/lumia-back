import { Expose, Type } from 'class-transformer';
import { GameVO } from '../vo/game.vo';
import { BaseResponse } from './baseResponse';

export class GameResponse extends BaseResponse {
  @Expose()
  @Type(() => GameVO)
  userGames?: GameVO[];
}
