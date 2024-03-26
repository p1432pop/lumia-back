import { Body, Controller, Get, Param, ParseIntPipe, Post, Req, Res, UsePipes, ValidationPipe } from '@nestjs/common';
import { PlayerService } from './player.service';
import { UpdatePlayerDto } from './dto/update-player.dto';
import { Request, Response } from 'express';

@Controller('player')
export class PlayerController {
  constructor(private readonly playerService: PlayerService) {}

  @Get('/:nickname/:season')
  async get(
    @Param('nickname') nickname: string,
    @Param('season', ParseIntPipe) season: number,
    @Res({ passthrough: true }) response: Response,
    @Req() request: Request,
  ) {
    //최근 검색한 플레이어의 이름을 쿠키로 저장
    if (request.cookies.nicknames) {
      const set = new Set(request.cookies.nicknames);
      set.add(nickname);
      const arr = Array.from(set);
      response.cookie('nicknames', arr);
    } else {
      response.cookie('nicknames', [nickname]);
    }
    return await this.playerService.get(nickname, season);
  }
  @Post()
  @UsePipes(ValidationPipe)
  async updatePlayer(@Body() updatePlayerDto: UpdatePlayerDto) {
    return await this.playerService.post(updatePlayerDto);
  }
}
