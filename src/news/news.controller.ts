import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { NewsService } from './news.service';
import { SerializeInterceptor } from 'src/shared/interceptor/serialize.interceptor';
import { NewsDTO } from './dto/news.dto';
import { ApiBadRequestResponse, ApiNotFoundResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BadRequestDTO } from 'src/shared/dto/request/bad-request.dto';
import { NotFoundDTO } from 'src/shared/dto/request/not-found.dto';

@Controller('news')
@ApiTags('News')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @ApiOperation({ summary: 'fetch news', description: 'fetch recent 4 news' })
  @ApiResponse({ status: 200, description: '200 response', type: NewsDTO, isArray: true })
  @ApiBadRequestResponse({ description: '400 response', type: BadRequestDTO })
  @ApiNotFoundResponse({ description: '404 response', type: NotFoundDTO })
  @Get()
  @UseInterceptors(new SerializeInterceptor(NewsDTO))
  async findAll(): Promise<NewsDTO[]> {
    return await this.newsService.findAll();
  }
}
