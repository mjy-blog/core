import { data } from './data';

export const allTags = (() => {
  const result = new Set<string>();
  data.forEach((post) => {
    post.attributes.tags.forEach((tag) => {
      result.add(tag);
    });
  });

  return [...result].sort((a, b) => a.localeCompare(b));
})();
