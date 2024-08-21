import { RankVO } from '../vo/rank.vo';
import { BaseResponse } from './baseResponse';
import { Expose, Type } from 'class-transformer';

export class RankResponse extends BaseResponse {
  @Expose()
  @Type(() => RankVO)
  topRanks?: RankVO[];
}
