import { Controller, Get, Query, UseInterceptors } from '@nestjs/common';
import { RankService } from './rank.service';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { RankDTO } from './dto/rank.dto';
import { RankQueryDTO } from './dto/rank-query.dto';
import { SerializeInterceptor } from 'src/shared/interceptor/serialize.interceptor';
import { ApiBadRequestResponse, ApiNotFoundResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BadRequestDTO } from 'src/shared/dto/request/bad-request.dto';
import { NotFoundDTO } from 'src/shared/dto/request/not-found.dto';

@Controller('rank')
@ApiTags('Rank')
export class RankController {
  constructor(private readonly rankService: RankService) {}

  @ApiOperation({ summary: 'fetch top rankers', description: 'fetch recent season 5 top rankers' })
  @ApiResponse({ status: 200, description: '200 response', type: RankDTO })
  @ApiBadRequestResponse({ description: '400 response', type: BadRequestDTO })
  @ApiNotFoundResponse({ description: '404 response', type: NotFoundDTO })
  @Get()
  @UseInterceptors(CacheInterceptor, new SerializeInterceptor(RankDTO))
  async getMainRanking(): Promise<RankDTO> {
    return await this.rankService.getMainRanking();
  }

  @ApiOperation({ summary: 'fetch top rankers', description: 'fetch rankers by seasonId, page' })
  @ApiResponse({ status: 200, description: '200 response', type: RankDTO })
  @ApiBadRequestResponse({ description: '400 response', type: BadRequestDTO })
  @ApiNotFoundResponse({ description: '404 response', type: NotFoundDTO })
  @Get('query')
  @UseInterceptors(new SerializeInterceptor(RankDTO))
  async getRanking(@Query() query: RankQueryDTO): Promise<RankDTO> {
    const { seasonId, page } = query;
    return await this.rankService.getRanking(seasonId, page);
  }
}
