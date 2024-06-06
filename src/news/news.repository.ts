import { Repository } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { News } from './news.entity';

@Injectable()
export class NewsRepository {
  constructor(
    @InjectRepository(News)
    private readonly newsRepository: Repository<News>,
  ) {}
  async findAll(): Promise<News[]> {
    const result = await this.newsRepository.find({
      order: {
        id: 'DESC',
      },
      take: 4,
    });
    if (result) return result;
    throw new NotFoundException();
  }
  async findOne(): Promise<News> {
    const result = await this.newsRepository.findOne({
      order: {
        id: 'DESC',
      },
      where: {},
    });
    if (result) return result;
    throw new NotFoundException();
  }
  async updateNews(news: News): Promise<void> {
    await this.newsRepository.save(news);
  }
}
