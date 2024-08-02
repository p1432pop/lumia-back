import { IsEnum, IsOptional } from 'class-validator';
import { ArmorType } from '../item-type.enum';
import { ApiProperty } from '@nestjs/swagger';

export class ArmorTypeDTO {
  @ApiProperty({ required: false, type: 'enum', enum: ArmorType })
  @IsOptional()
  @IsEnum(ArmorType, { message: 'Type must be a valid enum value' })
  armorType?: ArmorType;
}
