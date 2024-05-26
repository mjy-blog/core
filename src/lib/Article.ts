export interface ArticleAttributes {
  title: string;
  description: string;
  createTime: string;
  updateTime: string;
  preview?: string;
  tags: string[];
  categories: string[];
}

export interface Article {
  attributes: ArticleAttributes;
  path: string;
  slug: string;
}
