import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cron } from '@nestjs/schedule';
import { ItemService } from 'src/item/item.service';
import { NewsService } from 'src/news/news.service';
import { RankService } from 'src/rank/rank.service';

@Injectable()
export class BatchService {
  private readonly currentSeasonId: number;
  constructor(
    private readonly configService: ConfigService,
    private readonly rankService: RankService,
    private readonly itemService: ItemService,
    private readonly newsService: NewsService,
  ) {
    this.currentSeasonId = parseInt(this.configService.get<string>('CURRENT_SEASON_ID') || '23');
  }
  @Cron('0 * * * *')
  updateRanking() {
    //this.rankService.updateRanking(this.currentSeasonId);
  }

  @Cron('0 * * * *')
  updateItem() {
    /* this.itemService.updateItemConsumable();
    this.itemService.updateItemWearable(); */
  }

  @Cron('0 * * * *')
  updateNews() {}
}
