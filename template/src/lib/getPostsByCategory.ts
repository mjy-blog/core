import { PostAttribute } from '@mjy-blog/theme-lib';

import { Post } from './Post';
import { data } from './data';
import { stringArrayComparator } from './util/stringArrayComparator';

export function getPostsByCategory(category: string[]): Post<PostAttribute>[] {
  return data.filter(
    ({ attributes: { categories } }) =>
      stringArrayComparator(categories, category) === 0,
  );
}
