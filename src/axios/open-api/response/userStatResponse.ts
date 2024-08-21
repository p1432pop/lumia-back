import { UserStatVO } from '../vo/userStat.vo';
import { BaseResponse } from './baseResponse';
import { Expose, Type } from 'class-transformer';

export class UserStatResponse extends BaseResponse {
  @Expose()
  @Type(() => UserStatVO)
  userStats?: UserStatVO[];
}
