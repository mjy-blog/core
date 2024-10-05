import { readFile } from 'node:fs/promises';

import { Post } from '@mjy-blog/theme-lib';

import { data } from '../lib/data';
import { MainPage } from './_theme/MainPage';

export default async function Page() {
  const hierarchy = JSON.parse(
    (await readFile('./public/api/category/hierarchy.json')).toString(),
  );
  const recentPosts = data.slice(
    Math.max(0, data.length - 12),
    data.length,
  ) as Post<any>[];
  return (
    <MainPage
      hierarchy={hierarchy}
      recentPosts={recentPosts}
      recentCategories={recentPosts.map((post) => post.attributes.category)}
      recentTags={recentPosts.flatMap((post) => post.attributes.tags)}
    />
  );
}
