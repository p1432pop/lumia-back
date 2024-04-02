import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { RankService } from './rank.service';
import { RankRO } from './rank.interface';

@Controller('rank')
export class RankController {
  constructor(private readonly rankService: RankService) {}

  @Get('/:seasonId')
  async getRanking(@Param('seasonId', ParseIntPipe) seasonId: number, @Query('page', ParseIntPipe) page: number): Promise<RankRO> {
    return await this.rankService.getRanking(seasonId, page);
  }
}
