import type { Metadata } from 'next';
import '@/styles/globals.css';
import localFont from 'next/font/local';
import { SessionProvider } from 'next-auth/react';
import ClientProvider from '@/components/common/ClientProvider';

const pretendard = localFont({
  src: '../../public/fonts/PretendardVariable.woff2',
  display: 'swap',
  weight: '45 920',
  variable: '--font-pretendard',
});

export const metadata: Metadata = {
  title: 'I:Can',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${pretendard.variable}`}>
      <body className={pretendard.className}>
        <SessionProvider>
          <ClientProvider>{children}</ClientProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
