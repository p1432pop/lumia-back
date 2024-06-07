import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdatePlayerDto {
  @ApiProperty({ description: '유저의 고유 번호', type: 'integer' })
  @IsNumber()
  @IsNotEmpty()
  readonly userNum: number;

  @ApiProperty({ description: '유저의 닉네임', type: 'string' })
  @IsString()
  @IsNotEmpty()
  readonly nickname: string;
}
