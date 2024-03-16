import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { PlayerService } from './player.service';

@Controller('player')
export class PlayerController {
  constructor(private readonly playerService: PlayerService) {}

  @Get('/:nickname/:season')
  async get(@Param('nickname') nickname: string, @Param('season', ParseIntPipe) season: number) {
    return await this.playerService.get(nickname, season);
  }
  @Post()
  updatePlayer(@Body('nickname') nickname: string, @Body('userNum', ParseIntPipe) userNum: number, @Body('updated') updated: Date) {
    return { nickname };
  }
}
