import { Module } from '@nestjs/common';
import { NewsService } from './news.service';
import { NewsController } from './news.controller';
import { AxiosModule } from 'src/axios/axios.module';
import { News } from './news.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NewsRepository } from './news.repository';

@Module({
  imports: [TypeOrmModule.forFeature([News]), AxiosModule],
  controllers: [NewsController],
  providers: [NewsService, NewsRepository],
})
export class NewsModule {}
