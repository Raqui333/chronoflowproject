import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import type { Metadata } from 'next';
import { cookies } from 'next/headers';

import NextAuthProvider from '@/next-auth/nextAuthProvider';
import ReduxProvider from '@/redux/reduxProvider';
import MaterialThemeProvider from '@/material/materialThemeProvider';

export const metadata: Metadata = {
  title: 'Chrono Flow Project',
  description: 'Task flow plataform',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const theme = cookieStore.get('theme')?.value;

  return (
    <html lang="en">
      <body>
        <NextAuthProvider>
          <ReduxProvider>
            <MaterialThemeProvider initialTheme={theme as 'light' | 'dark'}>
              {children}
            </MaterialThemeProvider>
          </ReduxProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
