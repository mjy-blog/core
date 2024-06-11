import { Article } from './Article';
import { data } from './data';

export function getPostsByTag(tag: string): Article[] {
  return data.filter(({ attributes: { tags } }) => tags.includes(tag));
}
