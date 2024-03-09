import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cron } from '@nestjs/schedule';
import { RankService } from 'src/rank/rank.service';

@Injectable()
export class BatchService {
  constructor(private readonly configService: ConfigService) {}
  @Cron('0 * * * *')
  updateRanking() {
    const BSER_API_KEY = this.configService.get<string>('BSER_API_KEY');
  }
}
