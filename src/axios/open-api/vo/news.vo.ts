import { Expose, Type } from 'class-transformer';

class Ko_KR {
  @Expose()
  locale: string;

  @Expose()
  title: string;

  @Expose()
  summary: string;
}

class I18ns {
  @Expose()
  @Type(() => Ko_KR)
  ko_KR: Ko_KR;
}

export class ArticleVO {
  @Expose()
  id: number;

  @Expose()
  board_id: number;

  @Expose()
  category_id: number;

  @Expose()
  thumbnail_url: string;

  @Expose()
  created_at: string;

  @Expose()
  url: string;

  @Expose()
  @Type(() => I18ns)
  i18ns: I18ns;
}
