import { Injectable } from '@nestjs/common';
import { AxiosService } from 'src/axios/axios.service';
import { NewsRepository } from './news.repository';
import { NewsDTO } from './dto/news.dto';
import { ArticleAPI } from 'src/axios/open-api/news.interface';
import { News } from './news.entity';

@Injectable()
export class NewsService {
  private readonly CATEGORY_ID: number = 28;
  constructor(
    private readonly axiosService: AxiosService,
    private readonly newsRepository: NewsRepository,
  ) {}

  async findAll(): Promise<NewsDTO[]> {
    return await this.newsRepository.findAll();
  }

  async addNews(): Promise<void> {
    const newsResponse = await this.axiosService.getNews();
    if (newsResponse) {
      const { articles } = newsResponse;
      for (const article of articles) {
        if (this.isPatchNote(article)) {
          const news = new News();
          news.id = article.id;
          news.url = article.url;
          news.title = article.i18ns.ko_KR.title;
          await this.newsRepository.addNews(news);
          return;
        }
      }
    }
  }

  private isPatchNote(article: ArticleAPI): boolean {
    return article.category_id === this.CATEGORY_ID && article.i18ns.ko_KR.title.includes('패치노트');
  }
}
