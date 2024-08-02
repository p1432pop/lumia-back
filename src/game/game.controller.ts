import { Controller, Get, NotFoundException, Param, ParseIntPipe, UseInterceptors } from '@nestjs/common';
import { GameService } from './game.service';
import { GameDTO } from './dto/game.dto';
import { SerializeInterceptor } from 'src/shared/interceptor/serialize.interceptor';
import { ApiBadRequestResponse, ApiNotFoundResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BadRequestDTO } from 'src/shared/dto/request/bad-request.dto';
import { NotFoundDTO } from 'src/shared/dto/request/not-found.dto';
import { PositiveIntPipe } from 'src/shared/pipe/positiveInt.pipe';

@ApiTags('Game')
@Controller('game')
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @ApiOperation({ summary: 'fetch game', description: 'fetch user games by gameId' })
  @ApiResponse({ status: 200, description: '200 response', type: GameDTO, isArray: true })
  @ApiBadRequestResponse({ description: '400 response', type: BadRequestDTO })
  @ApiNotFoundResponse({ description: '404 response', type: NotFoundDTO })
  @Get('/:gameId')
  @UseInterceptors(new SerializeInterceptor(GameDTO))
  async getGame(@Param('gameId', ParseIntPipe, PositiveIntPipe) gameId: number): Promise<GameDTO[]> {
    const games = await this.gameService.getGame(gameId);
    if (games.length > 0) return games;
    throw new NotFoundException();
  }
}
