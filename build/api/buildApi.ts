import { rimraf } from 'rimraf';

import { buildCategory } from './category/buildCategory';
import { buildTag } from './tag/buildTag';

export async function buildApi() {
  await rimraf('public/api');

  await buildCategory();
  await buildTag();
}
