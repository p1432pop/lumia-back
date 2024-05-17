import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ItemConsumable, ItemWearable } from './item.entity';
import { ConsumableType, ItemType, WearableType } from './item-type.enum';

@Injectable()
export class ItemRepository {
  constructor(
    private readonly datasource: DataSource,
    @InjectRepository(ItemConsumable)
    private readonly itemConsumableRepository: Repository<ItemConsumable>,
    @InjectRepository(ItemWearable)
    private readonly itemWearableRepository: Repository<ItemWearable>,
  ) {}

  async getAllItemArmor(): Promise<ItemWearable[]> {
    return await this.itemWearableRepository.find({
      where: {
        itemType: ItemType.Armor,
      },
      order: {
        wearableType: 'ASC',
        itemGrade: 'ASC',
      },
    });
  }

  async getAllItemWeapon(): Promise<ItemWearable[]> {
    return await this.itemWearableRepository.find({
      where: {
        itemType: ItemType.Weapon,
      },
      order: {
        wearableType: 'ASC',
        itemGrade: 'ASC',
      },
    });
  }

  async getItemArmor(wearableType: WearableType): Promise<ItemWearable[]> {
    return await this.itemWearableRepository.find({
      where: {
        itemType: ItemType.Armor,
        wearableType,
      },
      order: {
        itemGrade: 'ASC',
      },
    });
  }

  async getItemWeapon(wearableType: WearableType): Promise<ItemWearable[]> {
    return await this.itemWearableRepository.find({
      where: {
        itemType: ItemType.Weapon,
        wearableType,
      },
      order: {
        itemGrade: 'ASC',
      },
    });
  }

  async getAllItemConsumable(): Promise<ItemConsumable[]> {
    return await this.itemConsumableRepository.find({
      order: {
        consumableType: 'ASC',
        itemGrade: 'ASC',
      },
    });
  }

  async getItemConsumable(consumableType: ConsumableType): Promise<ItemConsumable[]> {
    return await this.itemConsumableRepository.find({
      where: {
        consumableType,
      },
      order: {
        itemGrade: 'ASC',
      },
    });
  }

  async updateItemConsumable(items: ItemConsumable[]): Promise<void> {
    try {
      await this.itemConsumableRepository.delete({});
      await this.itemConsumableRepository.insert(items);
    } catch (e) {
      console.log(e);
    }
  }

  async updateItemWearable(items: ItemWearable[]): Promise<void> {
    try {
      await this.itemWearableRepository.delete({});
      await this.itemWearableRepository.insert(items);
    } catch (e) {
      console.log(e);
    }
  }
}
