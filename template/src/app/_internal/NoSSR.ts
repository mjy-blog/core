'use client';

import dynamic from 'next/dynamic';
import { PropsWithChildren } from 'react';

function NoSSRInternal({ children }: PropsWithChildren) {
  return children;
}

export const NoSSR = dynamic(() => Promise.resolve(NoSSRInternal), {
  ssr: false,
});
