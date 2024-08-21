import { ItemArmorVO, ItemConsumableVO, ItemWeaponVO } from '../vo/item.vo';
import { BaseResponse } from './baseResponse';
import { Expose, Type } from 'class-transformer';

export class ItemWeaponResponse extends BaseResponse {
  @Expose()
  @Type(() => ItemWeaponVO)
  data?: ItemWeaponVO[];
}

export class ItemArmorResponse extends BaseResponse {
  @Expose()
  @Type(() => ItemArmorVO)
  data?: ItemArmorVO[];
}

export class ItemConsumableResponse extends BaseResponse {
  @Expose()
  @Type(() => ItemConsumableVO)
  data?: ItemConsumableVO[];
}
