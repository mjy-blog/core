import { Article } from './Article';

import raw from '../app/_articles/index.json';

export const data: Article[] = raw.sort((a, b) => a.slug.localeCompare(b.slug));
