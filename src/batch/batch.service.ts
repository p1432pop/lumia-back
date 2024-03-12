import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cron } from '@nestjs/schedule';
import { RankService } from 'src/rank/rank.service';

@Injectable()
export class BatchService {
  private gameId: number;
  constructor(
    private readonly configService: ConfigService,
    private readonly rankService: RankService,
  ) {
    this.gameId = parseInt(this.configService.get<string>('FIRST_GAME_ID'));
  }
  @Cron('*/2 * * * 1 *')
  updateRanking() {
    console.log(1);
  }
}
