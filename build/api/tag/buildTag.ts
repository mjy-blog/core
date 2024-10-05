import { mkdir, writeFile } from 'fs/promises';
import { resolve } from 'path';

import { PostAttribute } from '@mjy-blog/theme-lib';
import { Post } from '../../../out/src/lib/Post';
import { allTags } from '../../../out/src/lib/allTags';
import { getPostsByTag } from '../../../out/src/lib/getPostsByTag';
import { stringArrayComparator } from '../../../out/src/lib/util/stringArrayComparator';

function relatedTags(
  exclude: string,
  posts: Post<PostAttribute>[],
): [string, number][] {
  const count = new Map<string, number>();
  for (const post of posts) {
    for (const tag of post.attributes.tags) {
      if (tag !== exclude) {
        count.set(tag, (count.get(tag) ?? 0) + 1);
      }
    }
  }
  return Object.entries(Object.fromEntries(count.entries())).sort(
    ([a, aCount], [b, bCount]) => {
      return bCount - aCount || a.localeCompare(b);
    },
  );
}

function relatedCategories(
  posts: Post<PostAttribute>[],
): (readonly [string[], number])[] {
  const countMap: (readonly [string[], number])[] = [];
  for (const post of posts) {
    for (let i = 1; i <= post.attributes.categories.length; i++) {
      const category = post.attributes.categories.slice(0, i);
      const index = countMap.findIndex(
        ([c]) => stringArrayComparator(c, category) === 0,
      );
      const count = index === -1 ? 0 : countMap[index][1];
      const next = [category, count + 1] as const;
      if (index === -1) {
        countMap.push(next);
      } else {
        countMap[index] = next;
      }
    }
  }

  return countMap.sort(
    ([a, aCount], [b, bCount]) =>
      bCount - aCount || stringArrayComparator(a, b),
  );
}

export async function buildTag() {
  for (const tag of allTags) {
    const dir = `out/public/api/tag/${tag}`;
    await mkdir(dir, { recursive: true });

    const posts = getPostsByTag(tag);
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
      JSON.stringify(relatedTags(tag, posts)),
    );

    await writeFile(
      resolve(dir, 'relatedCategories.json'),
      JSON.stringify(relatedCategories(posts)),
    );
  }
}
