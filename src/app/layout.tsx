import type { Metadata } from 'next';
import '@/styles/globals.css';
import localFont from 'next/font/local';
import { SessionProvider } from 'next-auth/react';
import { Toaster } from 'sonner';
import ClientProvider from '@/components/common/ClientProvider';
import { getThemeColor, getThemeDark, getThemeMode } from '@/services/theme';
import ThemeProvider from '@/components/common/ThemeProvider';

const pretendard = localFont({
  src: '../../public/fonts/PretendardVariable.woff2',
  display: 'swap',
  weight: '45 920',
  variable: '--font-pretendard',
});

export const metadata: Metadata = {
  title: 'I:Can',
  icons: {
    icon: '/images/favicon.ico',
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const themeMode = await getThemeMode();
  const themeDark = await getThemeDark();
  const themeColor = await getThemeColor();

  return (
    <html
      lang="ko"
      className={`${pretendard.variable}`}
      data-dark={themeDark}
      data-color={themeColor}
    >
      <body className={pretendard.className}>
        <SessionProvider>
          <ClientProvider>
            <ThemeProvider themeMode={themeMode}>
              <div>{children}</div>
            </ThemeProvider>
          </ClientProvider>
        </SessionProvider>
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
