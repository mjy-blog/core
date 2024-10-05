import { PostAttribute } from '@mjy-blog/theme-lib';

import { Post } from './Post';
import { data } from './data';

export function getPostsByTag(tag: string): Post<PostAttribute>[] {
  return data.filter(({ attributes: { tags } }) => tags.includes(tag));
}
