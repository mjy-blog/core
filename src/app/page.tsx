import { readFile } from 'fs/promises';

import { MainPage } from '@/app/_theme/MainPage';

export default async function Page() {
  const hierarchy = JSON.parse(
    (await readFile('./public/api/category/hierarchy.json')).toString(),
  );
  return <MainPage hierarchy={hierarchy} />;
}
