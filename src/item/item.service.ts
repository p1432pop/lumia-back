import { Injectable } from '@nestjs/common';
import { AxiosService } from 'src/axios/axios.service';
import { ItemRepository } from './item.repository';
import { ConsumableType, ArmorType, WeaponType } from './item-type.enum';
import { ItemConsumableDTO, ItemWearableDTO } from './dto/item.dto';
import { ItemWearable } from './item.entity';
import { ItemArmorAPI, ItemConsumableAPI, ItemWeaponAPI } from 'src/axios/open-api/item.interface';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class ItemService {
  constructor(
    private readonly axiosService: AxiosService,
    private readonly itemRepository: ItemRepository,
  ) {}

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
    const itemConsumable = await this.axiosService.getItemConsumable();
    const filteredItemConsumable = itemConsumable.filter((item) => {
      return item.modeType === 0 && item.consumableType in ConsumableType;
    });
    await this.itemRepository.updateItemConsumable(filteredItemConsumable);
  }

  async updateItemWearable(): Promise<void> {
    const itemWeaponResponse = await this.axiosService.getItemWeapon();
    if (!itemWeaponResponse) return;
    const itemWeapon = itemWeaponResponse.data.filter((item) => this.isValidItemWearable(item));
    const filteredItemWeapon = itemWeapon.filter((item) => {
      /* item.wearableType = item.weaponType;
      item.maxSp = item.maxSP; */
      return this.isValidItemWearable(item);
    });
    const itemArmorResponse = await this.axiosService.getItemArmor();
    if (!itemArmorResponse) return;

    const filteredItemArmor = itemArmor.filter((item) => {
      /* item.wearableType = item.armorType; */
      return this.isValidItemWearable(item);
    });
    const items = [...filteredItemWeapon, ...filteredItemArmor];
    await this.itemRepository.updateItemWearable(items);
  }

  private isValidItemWearable(item: ItemWeaponAPI | ItemArmorAPI): boolean {
    return item.modeType === 0 && !item.name.includes('패시브');
  }

  private isValidItemConsumable(item: ItemConsumableAPI): boolean {
    return item.modeType === 0 && item.consumableType in ConsumableType;
  }

  private itemWeaponToEntity(item: ItemWeaponAPI): ItemWearable {
    return {
      ...item,
      wearableType: item.weaponType,
      maxSp: item.maxSP,
    };
  }

  private itemArmorToEntity(item: ItemArmorAPI): ItemWearable {
    return {
      ...item,
      wearableType: item.armorType,
    };
  }
}
