import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import type { Metadata } from 'next';

import ReduxProvider from '@/redux/reduxProvider';
import MaterialThemeProvider from '@/material/materialThemeProvider';

export const metadata: Metadata = {
  title: 'Chrono Flow Project',
  description: 'Task flow plataform',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>
          <MaterialThemeProvider>{children}</MaterialThemeProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
