import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';

class topRank {
  @ApiProperty({
    example: 0,
    description: 'user number',
    type: 'number',
  })
  @Expose()
  userNum: number;

  @ApiProperty({
    example: 'string',
    description: 'user name',
    type: 'string',
  })
  @Expose()
  nickname: string;

  @Expose()
  mmr: number;

  @Expose()
  totalGames: number;

  @Expose()
  top1: number;

  @Expose()
  top3: number;

  @Expose()
  averageRank: number;

  @Expose()
  averageKills: number;

  @Expose()
  characterCode1: number;

  @Expose()
  charTotal1: number;

  @Expose()
  characterCode2?: number;

  @Expose()
  charTotal2?: number;

  @Expose()
  characterCode3?: number;

  @Expose()
  charTotal3?: number;
}

export class RankDTO {
  @ApiProperty({
    type: topRank,
    isArray: true,
  })
  @Type(() => topRank)
  @Expose()
  topRanks: topRank[];

  @ApiProperty({
    example: 'Date',
    description: 'Updated Time',
    type: 'Date',
  })
  @Expose()
  updated: Date;
}
