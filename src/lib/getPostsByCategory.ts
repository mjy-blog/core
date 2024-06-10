import { Article } from './Article';
import { data } from './data';
import { stringArrayComparator } from './util/stringArrayComparator';

export function getPostsByCategory(category: string[]): Article[] {
  return data.filter(
    ({ attributes: { categories } }) =>
      stringArrayComparator(categories, category) === 0,
  );
}
