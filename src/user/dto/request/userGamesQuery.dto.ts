import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsInt, IsNotEmpty, IsOptional, Min } from 'class-validator';
import { ToBoolean } from 'src/shared/decorator/boolean.decorator';

export class UserGamesQueryDTO {
  @ApiProperty({ description: '유저의 고유 번호', type: 'integer' })
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  readonly userNum: number;

  @ApiProperty({ description: "paging parameter 'next' from previous response", type: 'integer', required: false })
  @IsOptional()
  @IsInt()
  @Min(1)
  readonly next?: number;

  @ApiProperty({ description: '매칭 모드', type: 'boolean', required: false })
  @IsOptional()
  @ToBoolean()
  @IsBoolean()
  readonly isRank?: boolean;
}
