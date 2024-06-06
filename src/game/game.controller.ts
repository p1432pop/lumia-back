import { Controller, Get, Param, ParseIntPipe, UseInterceptors } from '@nestjs/common';
import { GameService } from './game.service';
import { GameDTO } from './dto/game.dto';
import { SerializeInterceptor } from 'src/shared/interceptor/serialize.interceptor';
import { ApiBadRequestResponse, ApiNotFoundResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BadRequestDTO } from 'src/shared/dto/request/bad-request.dto';
import { NotFoundDTO } from 'src/shared/dto/request/not-found.dto';

@Controller('game')
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @ApiTags('Game')
  @ApiOperation({ summary: 'fetch game', description: 'fetch user games by gameId' })
  @ApiResponse({ status: 200, description: '200 response', type: GameDTO, isArray: true })
  @ApiBadRequestResponse({ description: '400 response', type: BadRequestDTO })
  @ApiNotFoundResponse({ description: '404 response', type: NotFoundDTO })
  @Get('/:gameId')
  @UseInterceptors(new SerializeInterceptor(GameDTO))
  get(@Param('gameId', ParseIntPipe) gameId: number): Promise<GameDTO[]> {
    return this.gameService.getGameByGameId(gameId);
  }
}
