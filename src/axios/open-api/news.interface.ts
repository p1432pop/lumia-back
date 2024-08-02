export interface NewsResponse {
  per_page: number;
  current_page: number;
  total_page: number;
  article_count: number;
  articles: ArticleAPI[];
}

export interface ArticleAPI {
  id: number;
  board_id: number;
  category_id: number;
  thumbnail_url: string;
  created_at: string;
  url: string;
  i18ns: {
    ko_KR: {
      title: string;
    };
  };
}
