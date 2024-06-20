import { DataSource, Repository } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ItemConsumable, ItemWearable } from './item.entity';
import { ConsumableType, ItemType, WeaponType, ArmorType } from './item-type.enum';

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
    const result = await this.itemWearableRepository.find({
      where: {
        itemType: ItemType.Armor,
      },
      order: {
        wearableType: 'ASC',
        itemGrade: 'ASC',
      },
    });
    if (result.length > 0) return result;
    throw new NotFoundException();
  }

  async getAllItemWeapon(): Promise<ItemWearable[]> {
    const result = await this.itemWearableRepository.find({
      where: {
        itemType: ItemType.Weapon,
      },
      order: {
        wearableType: 'ASC',
        itemGrade: 'ASC',
      },
    });
    if (result.length > 0) return result;
    throw new NotFoundException();
  }

  async getItemArmor(armorType: ArmorType): Promise<ItemWearable[]> {
    const result = await this.itemWearableRepository.find({
      where: {
        itemType: ItemType.Armor,
        wearableType: armorType,
      },
      order: {
        itemGrade: 'ASC',
      },
    });
    if (result.length > 0) return result;
    throw new NotFoundException();
  }

  async getItemWeapon(weaponType: WeaponType): Promise<ItemWearable[]> {
    const result = await this.itemWearableRepository.find({
      where: {
        itemType: ItemType.Weapon,
        wearableType: weaponType,
      },
      order: {
        itemGrade: 'ASC',
      },
    });
    if (result.length > 0) return result;
    throw new NotFoundException();
  }

  async getAllItemConsumable(): Promise<ItemConsumable[]> {
    const result = await this.itemConsumableRepository.find({
      order: {
        consumableType: 'ASC',
        itemGrade: 'ASC',
      },
    });
    if (result.length > 0) return result;
    throw new NotFoundException();
  }

  async getItemConsumable(consumableType: ConsumableType): Promise<ItemConsumable[]> {
    const result = await this.itemConsumableRepository.find({
      where: {
        consumableType,
      },
      order: {
        itemGrade: 'ASC',
      },
    });
    if (result.length > 0) return result;
    throw new NotFoundException();
  }

  async updateItemConsumable(items: ItemConsumable[]): Promise<void> {
    const qr = this.datasource.createQueryRunner();
    await qr.connect();
    await qr.startTransaction();
    try {
      await this.itemConsumableRepository.delete({});
      await this.itemConsumableRepository.insert(items);
    } catch (e) {
      console.log(e);
      await qr.rollbackTransaction();
    } finally {
      await qr.release();
    }
  }

  async updateItemWearable(items: ItemWearable[]): Promise<void> {
    const qr = this.datasource.createQueryRunner();
    await qr.connect();
    await qr.startTransaction();
    try {
      await this.itemWearableRepository.delete({});
      await this.itemWearableRepository.insert(items);
    } catch (e) {
      console.log(e);
      await qr.rollbackTransaction();
    } finally {
      await qr.release();
    }
  }
}
