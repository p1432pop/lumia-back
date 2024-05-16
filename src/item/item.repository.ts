import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ItemConsumable, ItemWearable } from './item.entity';

@Injectable()
export class ItemRepository {
  constructor(
    @InjectRepository(ItemConsumable)
    private readonly itemConsumable: Repository<ItemConsumable>,
    @InjectRepository(ItemWearable)
    private readonly itemWearable: Repository<ItemWearable>,
  ) {}
}
