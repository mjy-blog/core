import { PropsWithChildren } from 'react';

import './_theme/sideEffects';

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
