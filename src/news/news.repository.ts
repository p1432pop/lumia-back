import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { News } from './news.entity';

@Injectable()
export class NewsRepository {
  constructor(
    @InjectRepository(News)
    private readonly newsRepository: Repository<News>,
  ) {}
  async get(): Promise<News[]> {
    return await this.newsRepository.find({
      order: {
        id: 'DESC',
      },
      take: 4,
    });
  }
  async post(news: News): Promise<void> {
    await this.newsRepository.save(news);
  }
}
