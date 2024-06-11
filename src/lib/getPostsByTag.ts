import { CustomPostAttribute } from '@/app/_theme/CustomPostAttribute';
import { Post } from './Post';
import { data } from './data';

export function getPostsByTag(tag: string): Post<CustomPostAttribute>[] {
  return data.filter(({ attributes: { tags } }) => tags.includes(tag));
}
