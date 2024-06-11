import { Metadata } from 'next';
import { ComponentType } from 'react';

import { PostPage } from '@/app/_theme/PostPage';
import { data } from '@/lib/data';
import { getArticleBySlug } from '@/lib/getArticleBySlug';
import { format } from 'util';

interface Params {
  params: Record<'slug', string>;
}

export default async function Post({ params }: Params) {
  const article = getArticleBySlug(params.slug);
  const MDXContent: ComponentType = (
    await import('../../_articles/' + article.path.replace(/\\/g, '/'))
  ).default;

  return (
    <PostPage
      MDXContent={MDXContent}
      attributes={article.attributes}
      slug={article.slug}
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
