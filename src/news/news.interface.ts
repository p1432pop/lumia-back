export interface news {
  articles: article[];
}

interface article {
  id: number;
  category_id: number;
  url: string;
  i18ns: {
    ko_KR: {
      title: string;
    };
  };
}
