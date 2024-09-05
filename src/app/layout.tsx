import { cookies } from 'next/headers';
import { PropsWithChildren } from 'react';

import { ModeContextProvider } from '@-ft/mode-next';

import { HeadContent } from './_theme/HeadContent';
import { RootLayout } from './_theme/RootLayout';

import './_theme/sideEffects';

export default function Layout({ children }: PropsWithChildren) {
  return (
    <html
      lang="ko"
      className={cookies().get('THEME')?.value === 'dark' ? 'dark' : undefined}
      suppressHydrationWarning
    >
      <head>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <script src="/mode.js" />
        <HeadContent />
      </head>
      <body>
        <ModeContextProvider
          variableName="npm:@-ft/mode-codegen"
          ssrInitialMode={'system'}
        >
          <RootLayout>{children}</RootLayout>
        </ModeContextProvider>
      </body>
    </html>
  );
}
