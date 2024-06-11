import { CustomPostAttribute } from '@/app/_theme/CustomPostAttribute';
import { Post } from './Post';
import { data } from './data';
import { stringArrayComparator } from './util/stringArrayComparator';

export function getPostsByCategory(
  category: string[],
): Post<CustomPostAttribute>[] {
  return data.filter(
    ({ attributes: { categories } }) =>
      stringArrayComparator(categories, category) === 0,
  );
}
