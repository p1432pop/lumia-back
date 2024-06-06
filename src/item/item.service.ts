import { Injectable } from '@nestjs/common';
import { AxiosService } from 'src/axios/axios.service';
import { ItemRepository } from './item.repository';
import { ConsumableType, ArmorType, WeaponType } from './item-type.enum';
import { ItemConsumableDTO, ItemWearableDTO } from './dto/item.dto';

@Injectable()
export class ItemService {
  constructor(
    private readonly axiosService: AxiosService,
    private readonly itemRepository: ItemRepository,
  ) {}

  async getAllItemArmor(): Promise<ItemWearableDTO[]> {
    return await this.itemRepository.getAllItemArmor();
  }

  async getAllItemWeapon(): Promise<ItemWearableDTO[]> {
    return await this.itemRepository.getAllItemWeapon();
  }

  async getItemArmor(armorType: ArmorType): Promise<ItemWearableDTO[]> {
    return await this.itemRepository.getItemArmor(armorType);
  }

  async getItemWeapon(weaponType: WeaponType): Promise<ItemWearableDTO[]> {
    return await this.itemRepository.getItemWeapon(weaponType);
  }

  async getAllItemConsumable(): Promise<ItemConsumableDTO[]> {
    return await this.itemRepository.getAllItemConsumable();
  }

  async getItemConsumable(consumableType: ConsumableType): Promise<ItemConsumableDTO[]> {
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
    const itemWeapon = await this.axiosService.getItemWeapon();
    const filteredItemWeapon = itemWeapon.filter((item) => {
      item.wearableType = item.weaponType;
      item.maxSp = item.maxSP;
      return item.modeType === 0 && !item.name.includes('패시브');
    });
    const itemArmor = await this.axiosService.getItemArmor();
    const filteredItemArmor = itemArmor.filter((item) => {
      item.wearableType = item.armorType;
      return item.modeType === 0 && !item.name.includes('패시브');
    });
    const items = [...filteredItemWeapon, ...filteredItemArmor];
    await this.itemRepository.updateItemWearable(items);
  }
}
