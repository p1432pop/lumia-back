import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class UserStatDTO {
  @ApiProperty({ description: '시즌 ID', type: 'integer' })
  @Expose()
  seasonId: number;

  @ApiProperty({ description: '1. 솔로\n2. 듀오\n3. 스쿼드', type: 'integer' })
  @Expose()
  matchingTeamMode: number;

  @ApiProperty({ description: '유저의 MMR', type: 'integer' })
  @Expose()
  mmr: number;
}
