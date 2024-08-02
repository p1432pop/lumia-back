import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { UserStatDTO } from './userStat.dto';

export class UserDTO {
  @ApiProperty({ description: '유저의 고유 번호', type: 'integer' })
  @Expose()
  userNum: number;

  @ApiProperty({ description: '유저의 닉네임', type: 'string' })
  @Expose()
  nickname: string;

  @ApiProperty({ description: '갱신 시간', type: Date, nullable: true })
  @Expose()
  updated: Date | null;

  @ApiProperty({ description: '유저의 MMR', type: 'integer', nullable: true })
  @Expose()
  mmr: number | null;

  @ApiProperty({ description: '유저의 계정 레벨', type: 'integer', nullable: true })
  @Expose()
  accountLevel: number | null;

  @ApiProperty({ description: '이전 시즌 mmr 통계', type: UserStatDTO, isArray: true })
  @Type(() => UserStatDTO)
  @Expose()
  prevStats: UserStatDTO[][];
}
