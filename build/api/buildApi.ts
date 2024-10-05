import { buildCategory } from './category/buildCategory';
import { buildTag } from './tag/buildTag';

export async function buildApi() {
  await buildCategory();
  await buildTag();
}
