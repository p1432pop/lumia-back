import { Controller, Get, Param, ParseIntPipe, Query, UseInterceptors } from '@nestjs/common';
import { RankService } from './rank.service';
import { RankRO } from './rank.interface';
import { CacheInterceptor } from '@nestjs/cache-manager';

@Controller('rank')
export class RankController {
  constructor(private readonly rankService: RankService) {}

  @Get()
  @UseInterceptors(CacheInterceptor)
  async getMainRanking(): Promise<RankRO> {
    return await this.rankService.getMainRanking();
  }
  @Get('/:seasonId')
  async getRanking(@Param('seasonId', ParseIntPipe) seasonId: number, @Query('page', ParseIntPipe) page: number): Promise<RankRO> {
    return await this.rankService.getRanking(seasonId, page);
  }
}
