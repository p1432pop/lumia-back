import { Controller, Get } from '@nestjs/common';
import { NewsService } from './news.service';
import { News } from './news.entity';

@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}
  @Get()
  async get(): Promise<News[]> {
    return await this.newsService.test();
  }
}
