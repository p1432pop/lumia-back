import { Injectable } from '@nestjs/common';
import { AxiosService } from 'src/axios/axios.service';
import { ItemRepository } from './item.repository';
import { ConsumableType, ArmorType, WeaponType } from './item-type.enum';
import { ItemConsumableDTO, ItemWearableDTO } from './dto/item.dto';
import { ItemConsumable, ItemWearable } from './item.entity';
import { ItemWeaponVO, ItemArmorVO, ItemConsumableVO } from 'src/axios/open-api/vo/item.vo';
import { AppLogger } from 'src/shared/logger/logger.service';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class ItemService {
  constructor(
    private readonly axiosService: AxiosService,
    private readonly itemRepository: ItemRepository,
    private readonly logger: AppLogger,
  ) {
    this.logger.setContext(ItemService.name);
  }

  async getItemArmor(armorType?: ArmorType): Promise<ItemWearableDTO[]> {
    return await this.itemRepository.getItemArmor(armorType);
  }

  async getItemWeapon(weaponType?: WeaponType): Promise<ItemWearableDTO[]> {
    return await this.itemRepository.getItemWeapon(weaponType);
  }

  async getItemConsumable(consumableType?: ConsumableType): Promise<ItemConsumableDTO[]> {
    return await this.itemRepository.getItemConsumable(consumableType);
  }

  async updateItemConsumable(): Promise<void> {
    const itemConsumableResponse = await this.axiosService.getItemConsumable();
    if (!itemConsumableResponse || !itemConsumableResponse.data) {
      this.logger.error('Failed to fetch ItemConsumable');
      return;
    }
    const itemConsumable = itemConsumableResponse.data.filter((item) => this.isValidItemConsumable(item));
    const itemConsumableEntity = itemConsumable.map((item) => this.itemConsumableToEntity(item));
    await this.itemRepository.updateItemConsumable(itemConsumableEntity);
  }

  async updateItemWeapon(): Promise<void> {
    const itemWeaponResponse = await this.axiosService.getItemWeapon();
    if (!itemWeaponResponse || !itemWeaponResponse.data) {
      this.logger.error('Failed to fetch ItemWeapon');
      return;
    }
    const itemWeapon = itemWeaponResponse.data.filter((item) => this.isValidItemWeapon(item));
    const itemWeaponEntity = itemWeapon.map((item) => this.itemWeaponToEntity(item));
    await this.itemRepository.updateItemWeapon(itemWeaponEntity);
  }

  async updateItemArmor(): Promise<void> {
    const itemArmorResponse = await this.axiosService.getItemArmor();
    if (!itemArmorResponse || !itemArmorResponse.data) {
      this.logger.error('Failed to fetch ItemArmor');
      return;
    }
    const itemArmor = itemArmorResponse.data.filter((item) => this.isValidItemArmor(item));
    const itemArmorEntity = itemArmor.map((item) => this.itemArmorToEntity(item));
    await this.itemRepository.updateItemArmor(itemArmorEntity);
  }

  private isValidItemWeapon(item: ItemWeaponVO): boolean {
    return item.modeType === 0 && !item.name.includes('패시브');
  }

  private isValidItemArmor(item: ItemArmorVO): boolean {
    return item.modeType === 0 && !item.name.includes('패시브');
  }

  private isValidItemConsumable(item: ItemConsumableVO): boolean {
    return item.modeType === 0 && item.consumableType in ConsumableType;
  }

  private itemWeaponToEntity(item: ItemWeaponVO): ItemWearable {
    const entity = plainToInstance(ItemWearable, item);
    entity.wearableType = item.weaponType;
    entity.maxSp = item.maxSP;
    return entity;
  }

  private itemArmorToEntity(item: ItemArmorVO): ItemWearable {
    const entity = plainToInstance(ItemWearable, item);
    entity.wearableType = item.armorType;
    return entity;
  }

  private itemConsumableToEntity(item: ItemConsumableVO): ItemConsumable {
    const entity = plainToInstance(ItemConsumable, item);
    return entity;
  }
}
