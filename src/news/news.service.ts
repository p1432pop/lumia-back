import { Injectable } from '@nestjs/common';
import { AxiosService } from 'src/axios/axios.service';
import { NewsRepository } from './news.repository';
import { NewsDTO } from './dto/news.dto';
import { News } from './news.entity';
import { ArticleVO } from 'src/axios/open-api/vo/news.vo';
import { AppLogger } from 'src/shared/logger/logger.service';

@Injectable()
export class NewsService {
  private readonly CATEGORY_ID: number = 28;
  constructor(
    private readonly axiosService: AxiosService,
    private readonly newsRepository: NewsRepository,
    private readonly logger: AppLogger,
  ) {
    this.logger.setContext(NewsService.name);
  }

  async findAll(): Promise<NewsDTO[]> {
    return await this.newsRepository.findAll();
  }

  async addNews(): Promise<void> {
    const newsResponse = await this.axiosService.getNews();
    if (!newsResponse) {
      this.logger.error('Failed to fetch News Articles');
      return;
    }
    for (const article of newsResponse.articles) {
      if (this.isPatchNote(article)) {
        const result = await this.newsRepository.addNews(this.toEntity(article));
        this.logger.log(`News Id ${result.id} was saved successfully`);
        return;
      }
    }
  }

  private isPatchNote(article: ArticleVO): boolean {
    return article.category_id === this.CATEGORY_ID && article.i18ns.ko_KR.title.includes('패치노트');
  }

  private toEntity(article: ArticleVO): News {
    const news = new News();
    news.id = article.id;
    news.url = article.url;
    news.title = article.i18ns.ko_KR.title;
    return news;
  }
}
