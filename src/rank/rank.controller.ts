import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { RankService } from './rank.service';
import { Ranking } from './ranking.entity';
import { Updated } from './updated.entity';

@Controller('rank')
export class RankController {
  constructor(private readonly rankService: RankService) {}

  @Get('/:seasonId')
  getRanking(@Param('seasonId', ParseIntPipe) seasonId: number): Promise<{ data: Ranking[]; updated: Date }> {
    return this.rankService.getRanking(seasonId);
  }
  /* @Get('/:seasonId')
  async getRanking(@Param('seasonId', ParseIntPipe) seasonId: number) {
    return await this.rankService.updateRanking(seasonId);
  } */
}
