import { readFile } from 'fs/promises';

import { Metadata } from 'next';

import { TagPage } from '@/app/_theme/TagPage';
import { Article } from '@/lib/Article';
import { allTags } from '@/lib/allTags';

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
  ) as Article[];
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
      posts={posts}
    />
  );
}

export function generateMetadata({ params }: Params): Metadata {
  const tag = decodeURIComponent(params.tag);
  if (allTags.indexOf(tag) === -1) {
    throw new Error(`Non-exist category: ${tag}`);
  }
  const title = `${tag} | mjy-blog`; // TODO: change this line

  return { title, openGraph: { title } };
}

export async function generateStaticParams(): Promise<Params['params'][]> {
  return allTags.map((tag) => ({ tag }));
}

export const dynamicParams = false;
export const dynamic = 'force-static';
