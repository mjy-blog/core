import { CustomPostAttribute } from '@/app/_theme/CustomPostAttribute';
import { Post } from './Post';
import { data } from './data';

export function getArticleBySlug(slug: string): Post<CustomPostAttribute> {
  const result = data.find((article) => article.slug === slug);
  if (!result) {
    throw new Error(`Non-exist slug: ${slug}`);
  }
  return result;
}
