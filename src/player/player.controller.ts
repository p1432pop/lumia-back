import { Body, Controller, DefaultValuePipe, Get, Param, ParseIntPipe, Post, Query, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { PlayerService } from './player.service';
import { UpdatePlayerDto } from './dto/update-player.dto';
import { PlayerAllRO, PlayerRO } from './player.interface';
import { PlayerStatsTransformInterceptor } from './interceptor/playerStatsTransform.interceptor';

@Controller('player')
export class PlayerController {
  constructor(private readonly playerService: PlayerService) {}

  @Get('recent/:nickname/:season')
  @UseInterceptors(PlayerStatsTransformInterceptor)
  async getRecentData(@Param('nickname') nickname: string, @Param('season', ParseIntPipe) season: number): Promise<PlayerAllRO> {
    return await this.playerService.getRecentData(nickname, season);
  }
  @Get('past/:userNum')
  async getPastData(@Param('userNum', ParseIntPipe) userNum: number, @Query('next', new DefaultValuePipe(0), ParseIntPipe) next: number) {
    return this.playerService.getPastData(userNum, next);
  }
  @Post()
  @UsePipes(ValidationPipe)
  async updatePlayer(@Body() updatePlayerDto: UpdatePlayerDto): Promise<PlayerAllRO> {
    return await this.playerService.post(updatePlayerDto);
  }
}
