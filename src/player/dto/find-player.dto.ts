import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class FindPlayerDto {
  @ApiProperty({ description: '유저의 고유 번호', type: 'integer' })
  @IsNumber()
  @IsNotEmpty()
  readonly userNum: number;

  @ApiProperty({ description: '시즌 ID', type: 'integer' })
  @IsNumber()
  @IsNotEmpty()
  readonly seasonId: number;

  @ApiProperty({ description: "paging parameter 'next' from previous response", type: 'integer', default: 0 })
  @IsNumber()
  readonly next: number = 0;
}
