import { IsBoolean, IsEnum, IsInt, IsNotEmpty, Min } from 'class-validator';
import { Tier } from '../tier.enum';
import { ApiProperty } from '@nestjs/swagger';
import { ToBoolean } from 'src/shared/decorator/boolean.decorator';

export class VersionStatQueryDTO {
  @ApiProperty({ description: '메인 수정 버전', type: 'integer' })
  @IsNotEmpty()
  @IsInt()
  @Min(0)
  versionMajor: number;

  @ApiProperty({ description: '마이너 수정 버전', type: 'integer' })
  @IsNotEmpty()
  @IsInt()
  @Min(0)
  versionMinor: number;

  @ApiProperty({ description: '매칭 모드', type: 'boolean' })
  @IsNotEmpty()
  @ToBoolean()
  @IsBoolean()
  isRank: boolean;

  @ApiProperty({ description: '티어', type: 'enum', enum: Tier })
  @IsNotEmpty()
  @IsEnum(Tier, { message: 'Type must be a valid enum value' })
  tier: Tier;
}
