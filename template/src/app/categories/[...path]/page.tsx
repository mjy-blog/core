import { readFile } from 'node:fs/promises';
import { format } from 'node:util';

import {
  CategorySubNode,
  Hierarchy,
  Post,
  PostAttribute,
} from '@mjy-blog/theme-lib';
import { Metadata } from 'next';

import { allCategories } from '../../../lib/allCategories';
import { stringArrayComparator } from '../../../lib/util/stringArrayComparator';
import { CategoryPage } from '../../_theme/CategoryPage';

interface Params {
  params: Record<'path', string[]>;
}

export default async function Category({ params }: Params) {
  const category = params.path.map((segment) => decodeURIComponent(segment));
  if (!allCategories.some((c) => stringArrayComparator(c, category))) {
    throw new Error(`Non-exist category: ${category.join(' / ')}`);
  }
  const hierarchy = JSON.parse(
    (
      await readFile(
        './public/api/category/' + category.join('/') + '/hierarchy.json',
      )
    ).toString(),
  ) as Hierarchy;
  const posts = JSON.parse(
    (
      await readFile(
        './public/api/category/' + category.join('/') + '/posts.json',
      )
    ).toString(),
  ) as Post<PostAttribute>[];
  const sub = JSON.parse(
    (
      await readFile(
        './public/api/category/' + category.join('/') + '/sub.json',
      )
    ).toString(),
  ) as CategorySubNode[];
  const relatedTags = JSON.parse(
    (
      await readFile(
        './public/api/category/' + category.join('/') + '/relatedTags.json',
      )
    ).toString(),
  ) as [tag: string, score: number][];

  return (
    <CategoryPage
      category={category}
      hierarchy={hierarchy}
      sub={sub}
      relatedTags={relatedTags}
      posts={posts as Post<any>[]}
    />
  );
}

export function generateMetadata({ params }: Params): Metadata {
  const category = params.path.map((segment) => decodeURIComponent(segment));
  if (!allCategories.some((c) => stringArrayComparator(c, category))) {
    throw new Error(`Non-exist category: ${category.join(' / ')}`);
  }
  const title = format(
    process.env.NEXT_PUBLIC_PAGE_TITLE_CATEGORY,
    category.join(' / '),
  );

  return { title, openGraph: { title } };
}

export async function generateStaticParams(): Promise<Params['params'][]> {
  return allCategories.map((category) => ({ path: category }));
}

export const dynamicParams = false;
export const dynamic = 'force-static';
