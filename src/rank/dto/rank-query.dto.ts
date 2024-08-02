import { ApiProperty } from '@nestjs/swagger';
import { IsInt, Max, Min } from 'class-validator';

export class RankQueryDTO {
  @ApiProperty({ example: 1, description: '시즌 ID', type: 'integer' })
  @IsInt()
  @Min(1)
  seasonId: number;

  @ApiProperty({ example: 1, description: '페이지', type: 'integer' })
  @IsInt()
  @Min(1)
  @Max(10)
  page: number;
}
