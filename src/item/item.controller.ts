import { Controller, Get, NotFoundException, Query, UseInterceptors } from '@nestjs/common';
import { ItemService } from './item.service';
import { WeaponTypeDTO } from './dto/weapon-type.dto';
import { ArmorTypeDTO } from './dto/armor-type.dto';
import { ConsumableTypeDTO } from './dto/consumable-type.dto';
import { ItemConsumableDTO, ItemWearableDTO } from './dto/item.dto';
import { SerializeInterceptor } from 'src/shared/interceptor/serialize.interceptor';
import { ApiBadRequestResponse, ApiNotFoundResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BadRequestDTO } from 'src/shared/dto/request/bad-request.dto';
import { NotFoundDTO } from 'src/shared/dto/request/not-found.dto';
import { AppLogger } from 'src/shared/logger/logger.service';

@ApiTags('Item')
@Controller('item')
export class ItemController {
  constructor(
    private readonly itemService: ItemService,
    private readonly logger: AppLogger,
  ) {
    this.logger.setContext(ItemController.name);
  }

  @ApiOperation({ summary: 'fetch consumable items', description: 'fetch consumable items by consumable type' })
  @ApiResponse({ status: 200, description: '200 response', type: ItemConsumableDTO, isArray: true })
  @ApiBadRequestResponse({ description: '400 response', type: BadRequestDTO })
  @ApiNotFoundResponse({ description: '404 response', type: NotFoundDTO })
  @Get('consumable')
  @UseInterceptors(new SerializeInterceptor(ItemConsumableDTO))
  async getItemConsumable(@Query() query: ConsumableTypeDTO): Promise<ItemConsumableDTO[]> {
    const { consumableType } = query;
    const items = await this.itemService.getItemConsumable(consumableType);
    if (items.length > 0) {
      this.logger.log(`${this.getItemConsumable.name} was called successfully`);
      return items;
    }
    this.logger.error('ItemConsumable is empty');
    throw new NotFoundException();
  }

  @ApiOperation({ summary: 'fetch armor items', description: 'fetch armor items by armor type' })
  @ApiResponse({ status: 200, description: '200 response', type: ItemWearableDTO, isArray: true })
  @ApiBadRequestResponse({ description: '400 response', type: BadRequestDTO })
  @ApiNotFoundResponse({ description: '404 response', type: NotFoundDTO })
  @Get('armor')
  @UseInterceptors(new SerializeInterceptor(ItemWearableDTO))
  async getItemArmor(@Query() query: ArmorTypeDTO): Promise<ItemWearableDTO[]> {
    const { armorType } = query;
    const items = await this.itemService.getItemArmor(armorType);
    if (items.length > 0) {
      this.logger.log(`${this.getItemArmor.name} was called successfully`);
      return items;
    }
    this.logger.error('ItemArmor is empty');
    throw new NotFoundException();
  }

  @ApiOperation({ summary: 'fetch weapon items', description: 'fetch weapon items by weapon type' })
  @ApiResponse({ status: 200, description: '200 response', type: ItemWearableDTO, isArray: true })
  @ApiBadRequestResponse({ description: '400 response', type: BadRequestDTO })
  @ApiNotFoundResponse({ description: '404 response', type: NotFoundDTO })
  @Get('weapon')
  @UseInterceptors(new SerializeInterceptor(ItemWearableDTO))
  async getItemWeapon(@Query() query: WeaponTypeDTO): Promise<ItemWearableDTO[]> {
    const { weaponType } = query;
    const items = await this.itemService.getItemWeapon(weaponType);
    if (items.length > 0) {
      this.logger.log(`${this.getItemWeapon.name} was called successfully`);
      return items;
    }
    this.logger.error('ItemWeapon is empty');
    throw new NotFoundException();
  }
}
