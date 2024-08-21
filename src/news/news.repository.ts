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

  async findAll(): Promise<News[]> {
    return await this.newsRepository.find({
      order: {
        id: 'DESC',
      },
      take: 4,
    });
  }

  async findOne(): Promise<News | null> {
    return await this.newsRepository.findOne({
      where: {},
      order: {
        id: 'DESC',
      },
    });
  }

  async addNews(news: News): Promise<News> {
    return await this.newsRepository.save(news);
  }
}
