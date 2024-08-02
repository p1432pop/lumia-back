import { IsEnum, IsOptional } from 'class-validator';
import { ConsumableType } from '../item-type.enum';
import { ApiProperty } from '@nestjs/swagger';

export class ConsumableTypeDTO {
  @ApiProperty({ required: false, type: 'enum', enum: ConsumableType })
  @IsOptional()
  @IsEnum(ConsumableType, { message: 'Type must be a valid enum value' })
  consumableType?: ConsumableType;
}
