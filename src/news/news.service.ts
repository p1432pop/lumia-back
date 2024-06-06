import { Injectable } from '@nestjs/common';
import { AxiosService } from 'src/axios/axios.service';
import { NewsRepository } from './news.repository';
import { NewsDTO } from './dto/news.dto';

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
    const { id } = await this.newsRepository.findOne();
    const news = await this.axiosService.test();
    for (let article of news.articles) {
      if (article.category_id === this.CATEGORY_ID && article.i18ns.ko_KR.title.includes('패치노트')) {
        if (article.id <= id) return;
        await this.newsRepository.updateNews({
          id: article.id,
          url: article.url,
          title: article.i18ns.ko_KR.title,
        });
        return;
      }
    }
  }
}
