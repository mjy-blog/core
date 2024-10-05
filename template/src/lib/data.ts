import { readFileSync } from 'node:fs';

import { PostAttribute } from '@mjy-blog/theme-lib';

import { Post } from './Post';

export const data: Post<PostAttribute>[] = JSON.parse(
  readFileSync(
    process.env.MJY_BLOG_DATA_PATH ?? './src/app/_articles/index.json',
  ).toString(),
).sort((a: Post<PostAttribute>, b: Post<PostAttribute>) =>
  a.slug.localeCompare(b.slug),
);
