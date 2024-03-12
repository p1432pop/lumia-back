import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { RankService } from './rank.service';

@Controller('rank')
export class RankController {
  constructor(private readonly rankService: RankService) {}

  @Get('/:seasonId')
  getRanking(@Param('seasonId', ParseIntPipe) seasonId: number) {
    return this.rankService.getRanking(seasonId);
  }
}
