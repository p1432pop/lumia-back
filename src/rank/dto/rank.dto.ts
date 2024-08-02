import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';

class CharacterStatDTO {
  @ApiProperty({ description: '실험체의 번호', type: 'integer' })
  @Expose()
  characterCode: number;

  @ApiProperty({ description: '플레이한 게임 수', type: 'integer' })
  @Expose()
  totalGames: number;

  @ApiProperty({ description: '승리 횟수', type: 'integer' })
  @Expose()
  wins: number;

  @ApiProperty({ description: 'top3 횟수', type: 'integer' })
  @Expose()
  top3: number;
}

class topRank {
  @ApiProperty({ description: '유저의 고유 번호', type: 'integer' })
  @Expose()
  userNum: number;

  @ApiProperty({ description: '유저의 닉네임', type: 'string' })
  @Expose()
  nickname: string;

  @ApiProperty({ description: '유저의 MMR', type: 'integer' })
  @Expose()
  mmr: number;

  @ApiProperty({ description: '플레이한 게임 수', type: 'integer' })
  @Expose()
  totalGames: number;

  @ApiProperty({ description: 'top1 비율', type: 'float', example: 0 })
  @Expose()
  top1: number;

  @ApiProperty({ description: 'top3 비율', type: 'float', example: 0 })
  @Expose()
  top3: number;

  @ApiProperty({ description: '평균 등수', type: 'float', example: 0 })
  @Expose()
  averageRank: number;

  @ApiProperty({ description: '평균 킬 수', type: 'float', example: 0 })
  @Expose()
  averageKills: number;

  @ApiProperty({ description: '가장 많이 사용한 캐릭터의 번호', type: CharacterStatDTO, isArray: true })
  @Type(() => CharacterStatDTO)
  @Expose()
  characterStats: CharacterStatDTO[];
}

export class RankDTO {
  @ApiProperty({ type: topRank, isArray: true })
  @Type(() => topRank)
  @Expose()
  topRanks: topRank[];

  @ApiProperty({ description: '갱신 시간', type: Date })
  @Expose()
  updated: Date;
}
