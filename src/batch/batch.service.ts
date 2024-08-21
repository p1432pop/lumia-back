import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cron } from '@nestjs/schedule';
import { GameService } from 'src/game/game.service';
import { ItemService } from 'src/item/item.service';
import { NewsService } from 'src/news/news.service';
import { RankService } from 'src/rank/rank.service';
import { AppLogger } from 'src/shared/logger/logger.service';
import { EnvironmentVariables } from 'src/shared/validator/env.validator';
import { StatisticsService } from 'src/statistics/statistics.service';

@Injectable()
export class BatchService implements OnModuleInit {
  private readonly currentSeasonId: number;
  constructor(
    private readonly configService: ConfigService<EnvironmentVariables, true>,
    private readonly logger: AppLogger,
    private readonly rankService: RankService,
    private readonly itemService: ItemService,
    private readonly newsService: NewsService,
    private readonly gameService: GameService,
    private readonly statisticsService: StatisticsService,
  ) {
    this.logger.setContext(BatchService.name);
    this.currentSeasonId = this.configService.get('CURRENT_SEASON_ID');
  }

  onModuleInit() {
    this.logger.log(`fetch game start`);
    this.gameService.interval();
  }

  @Cron('0 * * * *')
  updateRanking() {
    this.logger.log(`${this.updateRanking.name} called`);
    this.rankService.updateRanking(this.currentSeasonId);
  }

  @Cron('0 18 * * *')
  updateItem() {
    this.logger.log(`${this.updateItem.name} called`);
    this.itemService.updateItemConsumable();
    this.itemService.updateItemArmor();
    this.itemService.updateItemWeapon();
  }

  @Cron('0 15 * * *')
  updateNews() {
    this.logger.log(`${this.updateNews.name} called`);
    this.newsService.addNews();
  }

  @Cron('25 * * * *')
  refreshGameStat() {
    this.logger.log(`${this.refreshGameStat.name} called`);
    this.statisticsService.refresh();
  }
}
