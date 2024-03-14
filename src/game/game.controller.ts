import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { GameService } from './game.service';

@Controller('game')
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @Get('/:userNum')
  get(@Param('userNum', ParseIntPipe) userNum: number) {
    return this.gameService.get(userNum);
  }
}
