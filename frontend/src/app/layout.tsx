import type { Metadata } from 'next';
import './globals.css';

import { Provider } from 'react-redux';
import store from './redux/store';

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
        <Provider store={store}>{children}</Provider>
      </body>
    </html>
  );
}
