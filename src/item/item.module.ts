import { Module } from '@nestjs/common';
import { ItemService } from './item.service';
import { ItemController } from './item.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemConsumable, ItemWearable } from './item.entity';
import { ItemRepository } from './item.repository';
import { AxiosModule } from 'src/axios/axios.module';
import { AppLoggerModule } from 'src/shared/logger/logger.module';

@Module({
  imports: [TypeOrmModule.forFeature([ItemConsumable, ItemWearable]), AxiosModule, AppLoggerModule],
  controllers: [ItemController],
  providers: [ItemService, ItemRepository],
  exports: [ItemService],
})
export class ItemModule {}
