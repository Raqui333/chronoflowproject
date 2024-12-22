import type { Metadata } from 'next';
import './globals.css';

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
      <body>{children}</body>
    </html>
  );
}
