import { IsEnum, IsOptional } from 'class-validator';
import { WeaponType } from '../item-type.enum';
import { ApiProperty } from '@nestjs/swagger';

export class WeaponTypeDTO {
  @ApiProperty({
    example: WeaponType.Arcana,
    description: '',
    required: false,
    type: 'enum',
    enum: WeaponType,
  })
  @IsOptional()
  @IsEnum(WeaponType, { message: 'Type must be a valid enum value' })
  weaponType?: WeaponType;
}
