import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdatePlayerDto {
  @ApiProperty({
    description: 'user number',
    required: true,
    type: 'number',
  })
  @IsNumber()
  @IsNotEmpty()
  readonly userNum: number;

  @ApiProperty({
    description: 'user nickname',
    required: true,
    type: 'string',
  })
  @IsString()
  @IsNotEmpty()
  readonly nickname: string;
}
