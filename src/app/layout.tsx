import { PropsWithChildren } from 'react';

import { ModeContextProvider } from '@-ft/mode-next';

import { RootLayout } from './_theme/RootLayout';

import './_theme/sideEffects';

export default function Layout({ children }: PropsWithChildren) {
  return (
    <html lang="ko">
      <head>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <script src="/mode.js" />
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
