import { Controller, Get, NotFoundException, UseInterceptors } from '@nestjs/common';
import { NewsService } from './news.service';
import { SerializeInterceptor } from 'src/shared/interceptor/serialize.interceptor';
import { NewsDTO } from './dto/news.dto';
import { ApiNotFoundResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { NotFoundDTO } from 'src/shared/dto/request/not-found.dto';

@ApiTags('News')
@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @ApiOperation({ summary: 'fetch news', description: 'fetch recent 4 news' })
  @ApiResponse({ status: 200, description: '200 response', type: NewsDTO, isArray: true })
  @ApiNotFoundResponse({ description: '404 response', type: NotFoundDTO })
  @Get()
  @UseInterceptors(new SerializeInterceptor(NewsDTO))
  async findAll(): Promise<NewsDTO[]> {
    const news = await this.newsService.findAll();
    if (news.length > 0) return news;
    throw new NotFoundException();
  }
}
