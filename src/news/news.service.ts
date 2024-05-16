import { Injectable } from '@nestjs/common';
import { AxiosService } from 'src/axios/axios.service';
import { NewsRepository } from './news.repository';
import { News } from './news.entity';

@Injectable()
export class NewsService {
  private readonly CATEGORY_ID: number = 28;
  constructor(
    private readonly axiosService: AxiosService,
    private readonly newsRepository: NewsRepository,
  ) {}

  async test(): Promise<News[]> {
    return await this.newsRepository.get();
  }
  async addNews(): Promise<void> {
    const news = await this.axiosService.test();
    for (let article of news.articles) {
      if (article.category_id === this.CATEGORY_ID && article.i18ns.ko_KR.title.includes('패치노트')) {
        await this.newsRepository.post({
          id: article.id,
          url: article.url,
          title: article.i18ns.ko_KR.title,
        });
        return;
      }
    }
  }
}
