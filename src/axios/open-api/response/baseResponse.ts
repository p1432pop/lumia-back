import { Expose } from 'class-transformer';

export class BaseResponse {
  @Expose()
  code: number;

  @Expose()
  message: string;
}
