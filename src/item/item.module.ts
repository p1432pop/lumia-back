import { Module } from '@nestjs/common';
import { ItemService } from './item.service';
import { ItemController } from './item.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemConsumable, ItemWearable } from './item.entity';
import { ItemRepository } from './item.repository';
import { AxiosModule } from 'src/axios/axios.module';

@Module({
  imports: [TypeOrmModule.forFeature([ItemConsumable, ItemWearable]), AxiosModule],
  controllers: [ItemController],
  providers: [ItemService, ItemRepository],
})
export class ItemModule {}
