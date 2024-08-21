import { ArticleVO } from '../vo/news.vo';
import { Expose, Type } from 'class-transformer';

export class NewsResponse {
  @Expose()
  per_page: number;

  @Expose()
  current_page: number;

  @Expose()
  total_page: number;

  @Expose()
  article_count: number;

  @Expose()
  @Type(() => ArticleVO)
  articles: ArticleVO[];
}
