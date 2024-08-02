import { Controller, Get, Param, ParseIntPipe, Query, UseInterceptors } from '@nestjs/common';
import { StatisticsService } from './statistics.service';
import { VersionStatQueryDTO } from './dto/stat-query.dto';
import { PositiveIntPipe } from 'src/shared/pipe/positiveInt.pipe';
import { SerializeInterceptor } from 'src/shared/interceptor/serialize.interceptor';
import { UserCharStatDTO } from './dto/userCharStat.dto';
import { VersionStatDTO } from './dto/versionStat.dto';
import { ApiOperation, ApiParam, ApiResponse, ApiBadRequestResponse, ApiNotFoundResponse, ApiTags } from '@nestjs/swagger';
import { BadRequestDTO } from 'src/shared/dto/request/bad-request.dto';
import { NotFoundDTO } from 'src/shared/dto/request/not-found.dto';

@ApiTags('Statistics')
@Controller('statistics')
export class StatisticsController {
  constructor(private readonly statisticsService: StatisticsService) {}

  @ApiOperation({ summary: 'fetch user character statistics', description: 'fetch user character statistics by userNum' })
  @ApiParam({ name: 'userNum', type: 'integer', description: '유저의 고유 번호' })
  @ApiResponse({ status: 200, description: '200 response', type: UserCharStatDTO })
  @ApiBadRequestResponse({ description: '400 response', type: BadRequestDTO })
  @ApiNotFoundResponse({ description: '404 response', type: NotFoundDTO })
  @Get('user/:userNum')
  @UseInterceptors(new SerializeInterceptor(UserCharStatDTO))
  async getUserCharStat(@Param('userNum', ParseIntPipe, PositiveIntPipe) userNum: number): Promise<UserCharStatDTO[]> {
    return await this.statisticsService.getUserCharStat(userNum);
  }

  @ApiOperation({ summary: 'fetch game statistics', description: 'fetch game statistics by version, gamemode, tier' })
  @ApiResponse({ status: 200, description: '200 response', type: VersionStatDTO })
  @ApiBadRequestResponse({ description: '400 response', type: BadRequestDTO })
  @ApiNotFoundResponse({ description: '404 response', type: NotFoundDTO })
  @Get('game')
  @UseInterceptors(new SerializeInterceptor(VersionStatDTO))
  async getVersionStat(@Query() query: VersionStatQueryDTO): Promise<VersionStatDTO[]> {
    return await this.statisticsService.getVersionStat(query);
  }
}
