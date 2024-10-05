import { PropsWithChildren } from 'react';

import { PostLayout } from '../_theme/PostLayout';

export default function Layout({ children }: PropsWithChildren) {
  return <PostLayout>{children}</PostLayout>;
}
