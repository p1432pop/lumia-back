import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cron } from '@nestjs/schedule';
import { RankService } from 'src/rank/rank.service';

@Injectable()
export class BatchService {
  private readonly currentSeasonId: number;
  constructor(
    private readonly configService: ConfigService,
    private readonly rankService: RankService,
  ) {
    this.currentSeasonId = parseInt(this.configService.get<string>('CURRENT_SEASON_ID') || '23');
  }
  @Cron('0 * * * *')
  updateRanking() {
    //this.rankService.updateRanking(this.currentSeasonId);
  }
}
