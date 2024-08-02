import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class UserRank {
  @ApiProperty({ description: '랭킹 등수', type: 'integer' })
  @Expose()
  rank: number;

  @ApiProperty({ description: '랭크 게임 전체 인원 수', type: 'integer' })
  @Expose()
  rankSize: number;
}
