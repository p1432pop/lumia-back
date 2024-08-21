import { Module } from '@nestjs/common';
import { NewsService } from './news.service';
import { NewsController } from './news.controller';
import { AxiosModule } from 'src/axios/axios.module';
import { News } from './news.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NewsRepository } from './news.repository';
import { AppLoggerModule } from 'src/shared/logger/logger.module';

@Module({
  imports: [TypeOrmModule.forFeature([News]), AxiosModule, AppLoggerModule],
  controllers: [NewsController],
  providers: [NewsService, NewsRepository],
  exports: [NewsService],
})
export class NewsModule {}
