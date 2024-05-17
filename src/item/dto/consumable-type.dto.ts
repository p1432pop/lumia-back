import { IsEnum, IsOptional } from 'class-validator';
import { ConsumableType } from '../item-type.enum';

export class ConsumableTypeDTO {
  @IsOptional()
  @IsEnum(ConsumableType, { message: 'Type must be a valid enum value' })
  consumableType?: ConsumableType;
}
