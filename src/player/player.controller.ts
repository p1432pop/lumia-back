import { Body, Controller, Get, Param, ParseIntPipe, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { PlayerService } from './player.service';
import { UpdatePlayerDto } from './dto/update-player.dto';
import { PlayerRO } from './player.interface';

@Controller('player')
export class PlayerController {
  constructor(private readonly playerService: PlayerService) {}

  @Get('/:nickname/:season')
  async get(@Param('nickname') nickname: string, @Param('season', ParseIntPipe) season: number): Promise<PlayerRO> {
    return await this.playerService.get(nickname, season);
  }
  @Post()
  @UsePipes(ValidationPipe)
  async updatePlayer(@Body() updatePlayerDto: UpdatePlayerDto): Promise<PlayerRO> {
    return await this.playerService.post(updatePlayerDto);
  }
}
