import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, Min } from 'class-validator';

export class UpdateUserDTO {
  @ApiProperty({ description: '유저의 고유 번호', type: 'integer' })
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  readonly userNum: number;
}
