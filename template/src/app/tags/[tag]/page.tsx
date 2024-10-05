import { readFile } from 'node:fs/promises';
import { format } from 'node:util';

import { Post, PostAttribute } from '@mjy-blog/theme-lib';
import { Metadata } from 'next';

import { allTags } from '../../..//lib/allTags';
import { TagPage } from '../../_theme/TagPage';

interface Params {
  params: Record<'tag', string>;
}

export default async function Category({ params }: Params) {
  const tag = decodeURIComponent(params.tag);
  if (allTags.indexOf(tag) === -1) {
    throw new Error(`Non-exist category: ${tag}`);
  }
  const posts = JSON.parse(
    (await readFile('./public/api/tag/' + tag + '/posts.json')).toString(),
  ) as Post<PostAttribute>[];
  const relatedCategories = JSON.parse(
    (
      await readFile('./public/api/tag/' + tag + '/relatedCategories.json')
    ).toString(),
  ) as [category: string[], score: number][];
  const relatedTags = JSON.parse(
    (
      await readFile('./public/api/tag/' + tag + '/relatedTags.json')
    ).toString(),
  ) as [tag: string, score: number][];

  return (
    <TagPage
      tag={tag}
      relatedCategories={relatedCategories}
      relatedTags={relatedTags}
      posts={posts as Post<any>[]}
    />
  );
}

export function generateMetadata({ params }: Params): Metadata {
  const tag = decodeURIComponent(params.tag);
  if (allTags.indexOf(tag) === -1) {
    throw new Error(`Non-exist category: ${tag}`);
  }
  const title = format(process.env.NEXT_PUBLIC_PAGE_TITLE_TAG, tag);

  return { title, openGraph: { title } };
}

export async function generateStaticParams(): Promise<Params['params'][]> {
  return allTags.map((tag) => ({ tag }));
}

export const dynamicParams = false;
export const dynamic = 'force-static';
