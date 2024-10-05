import { Metadata } from 'next';
import { ComponentType } from 'react';

import { Hierarchy } from '@mjy-blog/theme-lib';
import { readFile } from 'fs/promises';
import { format } from 'util';
import { data } from '../../../lib/data';
import { getArticleBySlug } from '../../../lib/getArticleBySlug';
import { PostPage } from '../../_theme/PostPage';

interface Params {
  params: Record<'slug', string>;
}

export default async function Post({ params }: Params) {
  const article = getArticleBySlug(params.slug);
  const MDXContent: ComponentType = (
    await import('../../_articles/' + article.path.replace(/\\/g, '/'))
  ).default;
  const hierarchy = JSON.parse(
    (
      await readFile(
        `./public/api/category${article.attributes.categories
          .map((segment) => '/' + segment)
          .join('')}/hierarchy.json`,
      )
    ).toString(),
  ) as Hierarchy;

  return (
    <PostPage
      hierarchy={hierarchy}
      MDXContent={MDXContent}
      attributes={article.attributes as any}
      slug={article.slug}
      tocItems={article.tocItems}
    />
  );
}

export function generateMetadata({ params }: Params): Metadata {
  const article = getArticleBySlug(params.slug);
  const title = format(
    process.env.NEXT_PUBLIC_PAGE_TITLE_POST,
    article.attributes.title,
  );

  return {
    title,
    openGraph: {
      title,
      images: article.attributes.preview
        ? [article.attributes.preview]
        : undefined,
    },
  };
}

export async function generateStaticParams(): Promise<Params['params'][]> {
  return data.map(({ slug }) => ({ slug }));
}

export const dynamicParams = false;
export const dynamic = 'force-static';
