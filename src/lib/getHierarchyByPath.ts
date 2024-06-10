import { Hierarchy, HierarchyNode, HierarchyValue } from './Hierarchy';
import { allCategories } from './allCategories';
import { getPostsByCategory } from './getPostsByCategory';
import { stringArrayComparator } from './util/stringArrayComparator';

export function getHierarchyByPath(path: string[]): Hierarchy {
  const nodes = internal(path, []);

  return { nodes, path };
}

function internal(path: string[], prefix: string[]): HierarchyNode[] {
  const depth = prefix.length;
  const result: HierarchyNode[] = [];

  allCategories.forEach((category) => {
    if (category.length !== depth + 1) {
      return;
    }

    const b = category.slice(0, depth);
    if (stringArrayComparator(prefix, b) === 0) {
      const value: HierarchyValue = { type: 'category' };

      if (stringArrayComparator(path.slice(0, depth), b) === 0) {
        value.sub = [
          ...internal(path, [...prefix, category[depth]]),
          ...getPostsByCategory(b).map(
            ({ slug }) => [slug, { type: 'post' }] as const,
          ),
        ];
      }

      result.push([category[depth], value]);
    }
  });

  return result;
}
