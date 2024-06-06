import { Controller, Get, Query, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { ItemService } from './item.service';
import { WeaponTypeDTO } from './dto/weapon-type.dto';
import { ArmorTypeDTO } from './dto/armor-type.dto';
import { ConsumableTypeDTO } from './dto/consumable-type.dto';
import { ItemConsumableDTO, ItemWearableDTO } from './dto/item.dto';
import { SerializeInterceptor } from 'src/shared/interceptor/serialize.interceptor';
import { ApiBadRequestResponse, ApiNotFoundResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BadRequestDTO } from 'src/shared/dto/request/bad-request.dto';
import { NotFoundDTO } from 'src/shared/dto/request/not-found.dto';

@Controller('item')
@ApiTags('Item')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @ApiOperation({ summary: 'fetch consumable items', description: 'fetch consumable items by consumable type' })
  @ApiResponse({ status: 200, description: '200 response', type: ItemConsumableDTO, isArray: true })
  @ApiBadRequestResponse({ description: '400 response', type: BadRequestDTO })
  @ApiNotFoundResponse({ description: '404 response', type: NotFoundDTO })
  @Get('consumable')
  @UsePipes(ValidationPipe)
  @UseInterceptors(new SerializeInterceptor(ItemConsumableDTO))
  async getItemConsumable(@Query() query: ConsumableTypeDTO): Promise<ItemConsumableDTO[]> {
    const { consumableType } = query;
    if (consumableType) {
      return await this.itemService.getItemConsumable(consumableType);
    }
    return await this.itemService.getAllItemConsumable();
  }

  @ApiOperation({ summary: 'fetch armor items', description: 'fetch armor items by wearable type' })
  @ApiResponse({ status: 200, description: '200 response', type: ItemWearableDTO, isArray: true })
  @ApiBadRequestResponse({ description: '400 response', type: BadRequestDTO })
  @ApiNotFoundResponse({ description: '404 response', type: NotFoundDTO })
  @Get('armor')
  @UsePipes(ValidationPipe)
  @UseInterceptors(new SerializeInterceptor(ItemWearableDTO))
  async getItemArmor(@Query() query: ArmorTypeDTO): Promise<ItemWearableDTO[]> {
    const { armorType } = query;
    if (armorType) {
      return await this.itemService.getItemArmor(armorType);
    }
    return await this.itemService.getAllItemArmor();
  }

  @ApiOperation({ summary: 'fetch weapon items', description: 'fetch weapon items by wearable type' })
  @ApiResponse({ status: 200, description: '200 response', type: ItemWearableDTO, isArray: true })
  @ApiBadRequestResponse({ description: '400 response', type: BadRequestDTO })
  @ApiNotFoundResponse({ description: '404 response', type: NotFoundDTO })
  @Get('weapon')
  @UsePipes(ValidationPipe)
  @UseInterceptors(new SerializeInterceptor(ItemWearableDTO))
  async getItemWeapon(@Query() query: WeaponTypeDTO): Promise<ItemWearableDTO[]> {
    const { weaponType } = query;
    if (weaponType) {
      return await this.itemService.getItemWeapon(weaponType);
    }
    return await this.itemService.getAllItemWeapon();
  }

  @Get('update')
  async test() {
    await this.itemService.updateItemConsumable();
    await this.itemService.updateItemWearable();
  }
}
