import type { Metadata } from 'next';
import '@/styles/globals.css';
import localFont from 'next/font/local';
import cn from '@/utils/cn';
import Navbar from '@/components/common/navbar/Navbar';

const pretendard = localFont({
  src: '../../../public/fonts/PretendardVariable.woff2',
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
      <body
        className={cn(
          'flex h-screen w-screen bg-slate-100',
          pretendard.className,
        )}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}
