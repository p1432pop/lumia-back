import { Controller, Get, ParseIntPipe, Query, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { RankService } from './rank.service';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { RankDTO } from './dto/rank.dto';
import { RankQueryDTO } from './dto/rank-query.dto';

@Controller('rank')
export class RankController {
  constructor(private readonly rankService: RankService) {}

  @Get()
  @UseInterceptors(CacheInterceptor)
  async getMainRanking(): Promise<RankDTO> {
    return await this.rankService.getMainRanking();
  }
  @Get('query')
  @UsePipes(ValidationPipe)
  async getRanking(@Query() query: RankQueryDTO): Promise<RankDTO> {
    const { seasonId, page } = query;
    console.log(typeof seasonId);
    return await this.rankService.getRanking(seasonId, page);
  }
}
