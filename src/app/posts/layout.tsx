import { PropsWithChildren } from 'react';

import { PostLayout } from '@/app/_theme/PostLayout';

export default function Layout({ children }: PropsWithChildren) {
  return <PostLayout>{children}</PostLayout>;
}
