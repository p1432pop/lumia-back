import { Body, Controller, DefaultValuePipe, Get, Param, ParseIntPipe, Post, Query, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { PlayerService } from './player.service';
import { UpdatePlayerDto } from './dto/update-player.dto';
import { PlayerStatsTransformInterceptor } from './interceptor/playerStatsTransform.interceptor';
import { PlayerDTO, PlayerPastDTO } from './dto/player.dto';
import { SerializeInterceptor } from 'src/shared/interceptor/serialize.interceptor';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiNotFoundResponse, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BadRequestDTO } from 'src/shared/dto/request/bad-request.dto';
import { NotFoundDTO } from 'src/shared/dto/request/not-found.dto';

@ApiTags('Player')
@Controller('player')
export class PlayerController {
  constructor(private readonly playerService: PlayerService) {}

  @ApiOperation({ summary: 'fetch user data', description: 'fetch user data by nickname, seasonId' })
  @ApiResponse({ status: 200, description: '200 response', type: PlayerDTO })
  @ApiBadRequestResponse({ description: '400 response', type: BadRequestDTO })
  @ApiNotFoundResponse({ description: '404 response', type: NotFoundDTO })
  @ApiParam({ name: 'nickname', description: 'user nickname' })
  @ApiParam({ name: 'seasonId', description: 'season id' })
  @Get('recent/:nickname/:seasonId')
  @UseInterceptors(PlayerStatsTransformInterceptor, new SerializeInterceptor(PlayerDTO))
  async getRecentData(@Param('nickname') nickname: string, @Param('seasonId', ParseIntPipe) seasonId: number): Promise<PlayerDTO> {
    return await this.playerService.getRecentData(nickname, seasonId);
  }

  @ApiOperation({ summary: 'fetch user games', description: 'fetch games by userNum' })
  @ApiResponse({ status: 200, description: '200 response', type: PlayerPastDTO })
  @ApiBadRequestResponse({ description: '400 response', type: BadRequestDTO })
  @ApiNotFoundResponse({ description: '404 response', type: NotFoundDTO })
  @ApiParam({ name: 'userNum', description: 'user number' })
  @ApiQuery({ name: 'next', description: "paging parameter 'next' from previous response" })
  @Get('past/:userNum')
  @UseInterceptors(new SerializeInterceptor(PlayerPastDTO))
  async getPastData(
    @Param('userNum', ParseIntPipe) userNum: number,
    @Query('next', new DefaultValuePipe(0), ParseIntPipe) next: number,
  ): Promise<PlayerPastDTO> {
    return await this.playerService.getPastData(userNum, next);
  }

  @ApiOperation({ summary: 'update user data', description: 'update user data by userNum, nickname' })
  @ApiCreatedResponse({ description: '201 response', type: PlayerDTO })
  @ApiBadRequestResponse({ description: '400 response', type: BadRequestDTO })
  @ApiNotFoundResponse({ description: '404 response', type: NotFoundDTO })
  @Post()
  @UseInterceptors(new SerializeInterceptor(PlayerDTO))
  async updatePlayer(@Body() updatePlayerDto: UpdatePlayerDto): Promise<PlayerDTO> {
    return await this.playerService.post(updatePlayerDto);
  }
}
