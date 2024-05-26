import { Article } from './Article';
import { data } from './data';

export function getArticleBySlug(slug: string): Article {
  const result = data.find((article) => article.slug === slug);
  if (!result) throw new Error(`Non-exist slug: ${slug}`);
  return result;
}
