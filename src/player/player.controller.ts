import { Controller, Get, Param } from '@nestjs/common';
import { PlayerService } from './player.service';

@Controller('player')
export class PlayerController {
  constructor(private readonly playerService: PlayerService) {}

  @Get('/:nickname')
  async get(@Param('nickname') nickname: string) {
    console.log(nickname);
    return await this.playerService.get(nickname);
  }
}
