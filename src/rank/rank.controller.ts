import { Controller, Get, Param } from '@nestjs/common';
import { RankService } from './rank.service';
import { Ranking2 } from './season2.entity';

@Controller('rank')
export class RankController {
  constructor(private readonly rankService: RankService) {}

  @Get('/:gameId')
  getRank(@Param('gameId') gameId: number): Promise<number> {
    let arr = [gameId];
    for (let i = 1; i < 10; i++) {
      arr.push(gameId + i);
    }
    return this.rankService.getGamesByGameIds(arr);
  }

  @Get()
  geta() {
    return this.rankService.updateRanking();
  }
}
