import { PropsWithChildren } from 'react';

import { HeadContent } from './_theme/HeadContent';
import { RootLayout } from './_theme/RootLayout';

import './_theme/sideEffects';

export default function Layout({ children }: PropsWithChildren) {
  return (
    <html lang="ko">
      <head>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <HeadContent />
      </head>
      <body>
        <RootLayout>{children}</RootLayout>
      </body>
    </html>
  );
}
