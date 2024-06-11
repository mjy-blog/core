import raw from '@/app/_articles/index.json';
import { CustomPostAttribute } from '@/app/_theme/CustomPostAttribute';
import { Post } from './Post';

export const data: Post<CustomPostAttribute>[] = raw.sort((a, b) =>
  a.slug.localeCompare(b.slug),
);
