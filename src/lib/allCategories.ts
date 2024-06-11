import { data } from './data';
import { isSameStringArray } from './util/isSameStringArray';
import { stringArrayComparator } from './util/stringArrayComparator';

export const allCategories: string[][] = (() => {
  const result: string[][] = [];
  data.forEach((post) => {
    for (let i = 1; i < post.attributes.categories.length + 1; i++) {
      const category = post.attributes.categories.slice(0, i);
      if (!result.some((c) => isSameStringArray(c, category))) {
        result.push(category);
      }
    }
  });

  return result.sort(stringArrayComparator);
})();
