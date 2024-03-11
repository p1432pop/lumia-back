import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { RankService } from './rank.service';
import { Ranking2 } from './season2.entity';

@Controller('rank')
export class RankController {
  constructor(private readonly rankService: RankService) {}

  @Get('/:gameId')
  getRank(@Param('gameId', ParseIntPipe) gameId: number): Promise<number> {
    let arr = [];
    for (let i: number = 0; i < 40; i++) {
      arr.push(gameId + i);
      console.log(gameId + i);
    }
    return this.rankService.getGamesByGameIds(arr);
  }

  @Get()
  geta() {
    return this.rankService.getRank();
  }
}
