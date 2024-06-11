import { PostAttribute } from '@mjy-blog/theme-lib';

export interface Post<T extends PostAttribute> {
  attributes: T;
  path: string;
  slug: string;
}
