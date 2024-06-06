import { ApiProperty } from '@nestjs/swagger';
import { IsInt, Max, Min } from 'class-validator';

export class RankQueryDTO {
  @ApiProperty({
    example: 1,
    description: '',
    required: true,
    type: 'number',
  })
  @IsInt()
  @Min(1)
  seasonId: number;

  @ApiProperty({
    example: 1,
    description: '',
    required: true,
    type: 'number',
  })
  @IsInt()
  @Min(1)
  @Max(10)
  page: number;
}
