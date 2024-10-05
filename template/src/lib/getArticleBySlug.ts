import { PostAttribute } from '@mjy-blog/theme-lib';

import { Post } from './Post';
import { data } from './data';

export function getArticleBySlug(slug: string): Post<PostAttribute> {
  const result = data.find((article) => article.slug === slug);
  if (!result) {
    throw new Error(`Non-exist slug: ${slug}`);
  }
  return result;
}
