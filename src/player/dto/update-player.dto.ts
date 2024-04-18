import { IsNotEmpty, IsNumber, IsString, Matches } from 'class-validator';

export class UpdatePlayerDto {
  @IsNumber()
  @IsNotEmpty()
  readonly userNum: number;

  @IsString()
  @IsNotEmpty()
  readonly nickname: string;
}
