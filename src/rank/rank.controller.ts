import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { RankService } from './rank.service';
import { RankFetchDTO } from './dto/rank-fetch.dto';

@Controller('rank')
export class RankController {
  constructor(private readonly rankService: RankService) {}

  @Get('/:seasonId')
  async getRanking(@Param('seasonId', ParseIntPipe) seasonId: number): Promise<RankFetchDTO> {
    return await this.rankService.getRanking(seasonId);
  }
}
