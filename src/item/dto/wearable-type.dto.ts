import { IsEnum, IsOptional } from 'class-validator';
import { WearableType } from '../item-type.enum';

export class WearableTypeDTO {
  @IsOptional()
  @IsEnum(WearableType, { message: 'Type must be a valid enum value' })
  wearableType?: WearableType;
}
