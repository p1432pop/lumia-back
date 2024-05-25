import { Type } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class RankQueryDTO {
  @IsNumber()
  @Type(() => Number)
  seasonId: number;

  @IsNumber()
  @Type(() => Number)
  page: number;
}
