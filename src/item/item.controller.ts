import { Controller, Get, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { ItemService } from './item.service';
import { WearableTypeDTO } from './dto/wearable-type.dto';
import { ConsumableTypeDTO } from './dto/consumable-type.dto';
import { ItemsConsumableDTO, ItemsWearableDTO } from './dto/item.dto';

@Controller('item')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Get('consumable')
  @UsePipes(ValidationPipe)
  async getItemConsumable(@Query() query: ConsumableTypeDTO): Promise<ItemsConsumableDTO> {
    const { consumableType } = query;
    if (consumableType) {
      return await this.itemService.getItemConsumable(consumableType);
    }
    return await this.itemService.getAllItemConsumable();
  }

  @Get('armor')
  @UsePipes(ValidationPipe)
  async getItemArmor(@Query() query: WearableTypeDTO): Promise<ItemsWearableDTO> {
    const { wearableType } = query;
    if (wearableType) {
      return await this.itemService.getItemArmor(wearableType);
    }
    return await this.itemService.getAllItemArmor();
  }

  @Get('weapon')
  @UsePipes(ValidationPipe)
  async getItemWeapon(@Query() query: WearableTypeDTO): Promise<ItemsWearableDTO> {
    const { wearableType } = query;
    if (wearableType) {
      return await this.itemService.getItemWeapon(wearableType);
    }
    return await this.itemService.getAllItemWeapon();
  }

  @Get('update')
  async test() {
    await this.itemService.updateItemConsumable();
    await this.itemService.updateItemWearable();
  }
}
