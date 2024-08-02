import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cron, Interval } from '@nestjs/schedule';
import { GameService } from 'src/game/game.service';
import { ItemService } from 'src/item/item.service';
import { NewsService } from 'src/news/news.service';
import { RankService } from 'src/rank/rank.service';
import { StatisticsService } from 'src/statistics/statistics.service';

@Injectable()
export class BatchService {
  private readonly currentSeasonId: number;
  constructor(
    private readonly configService: ConfigService,
    private readonly rankService: RankService,
    private readonly itemService: ItemService,
    private readonly newsService: NewsService,
    private readonly gameService: GameService,
    private readonly statisticsService: StatisticsService,
  ) {
    this.currentSeasonId = parseInt(this.configService.get<string>('CURRENT_SEASON_ID') || '25');
  }

  @Cron('0 * * * *')
  updateRanking() {
    //this.rankService.updateRanking(this.currentSeasonId);
  }

  @Cron('0 18 * * *')
  updateItem() {
    this.itemService.updateItemConsumable();
    this.itemService.updateItemWearable();
  }

  @Cron('0 15 * * *')
  updateNews() {
    this.newsService.addNews();
  }

  @Cron('*/10 * * * *')
  refreshGameStat() {
    //this.statisticsService.refresh();
  }
}
