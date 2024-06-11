import { mkdir, writeFile } from 'fs/promises';
import { resolve } from 'path';

import { Article } from '../../../src/lib/Article';
import { HierarchyNode } from '../../../src/lib/Hierarchy';
import { allCategories } from '../../../src/lib/allCategories';
import { getHierarchyByPath } from '../../../src/lib/getHierarchyByPath';
import { getPostsByCategory } from '../../../src/lib/getPostsByCategory';
import { inconsistencyError } from '../../util/inconsistencyError';

function getSub(nodes: HierarchyNode[], category: string[]): HierarchyNode[] {
  const value = nodes.filter(([name]) => name === category[0])[0][1];
  if (category.length <= 1) {
    return (value.type === 'category' && value.sub!) || inconsistencyError();
  } else {
    return getSub(
      (value.type === 'category' && value.sub!) || inconsistencyError(),
      category.slice(1),
    );
  }
}

function relatedTags(posts: Article[]): [string, number][] {
  const count = new Map<string, number>();
  for (const post of posts) {
    for (const tag of post.attributes.tags) {
      count.set(tag, (count.get(tag) ?? 0) + 1);
    }
  }
  return Object.entries(Object.fromEntries(count.entries())).sort(
    ([a, aCount], [b, bCount]) => {
      return aCount - bCount || a.localeCompare(b);
    },
  );
}

export async function buildCategory() {
  for (const category of allCategories) {
    const dir = `public/api/category/${category.join('/')}`;
    await mkdir(dir, { recursive: true });

    const hierarchy = getHierarchyByPath(category);
    await writeFile(resolve(dir, 'hierarchy.json'), JSON.stringify(hierarchy));

    const sub = getSub(hierarchy.nodes, category);
    await writeFile(
      resolve(dir, 'sub.json'),
      JSON.stringify(sub.map(([name, { type }]) => [name, type])),
    );

    const posts = getPostsByCategory(category);
    await writeFile(
      resolve(dir, 'posts.json'),
      JSON.stringify(
        posts.map(({ attributes, slug }) => ({
          attributes,
          slug,
        })),
      ),
    );

    await writeFile(
      resolve(dir, 'relatedTags.json'),
      JSON.stringify(relatedTags(posts)),
    );
  }
}
