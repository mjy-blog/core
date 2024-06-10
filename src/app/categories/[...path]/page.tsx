import { allCategories } from '@/lib/allCategories';
import { getHierarchyByPath } from '@/lib/getHierarchyByPath';
import { getPostsByCategory } from '@/lib/getPostsByCategory';
import { stringArrayComparator } from '@/lib/util/stringArrayComparator';
import { Metadata } from 'next';

interface Params {
  params: Record<'path', string[]>;
}

export default async function Category({ params }: Params) {
  const category = params.path.map((segment) => decodeURIComponent(segment));
  if (!allCategories.some((c) => stringArrayComparator(c, category))) {
    throw new Error(`Non-exist category: ${category.join(' / ')}`);
  }
  const hierarchy = getHierarchyByPath(category);
  const posts = getPostsByCategory(category);

  return (
    <pre>
      <code>{JSON.stringify({ hierarchy, posts }, undefined, 2)}</code>
    </pre>
  );
}

export function generateMetadata({ params }: Params): Metadata {
  const category = params.path.map((segment) => decodeURIComponent(segment));
  if (!allCategories.some((c) => stringArrayComparator(c, category))) {
    throw new Error(`Non-exist category: ${category.join(' / ')}`);
  }
  const title = `${category.join(' / ')} | mjy-blog`; // TODO: change this line

  return { title, openGraph: { title } };
}

export async function generateStaticParams(): Promise<Params['params'][]> {
  return allCategories.map((category) => ({ path: category }));
}

export const dynamicParams = false;
export const dynamic = 'force-static';
