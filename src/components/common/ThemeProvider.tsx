'use client';

import { ReactNode, useEffect } from 'react';
import { setThemeDark } from '@/services/theme';

interface Props {
  themeMode: string;
  children: ReactNode;
}

export default function ThemeProvider({ themeMode, children }: Props) {
  /**
   * themeMode가 system일때는 themeMode 변경 이벤트 리스너 등록
   */
  useEffect(() => {
    if (themeMode !== 'system') return () => {}; // system일 때만 실행

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = async (e: MediaQueryListEvent) => {
      const isDark = e.matches;
      document.documentElement.setAttribute('data-dark', String(isDark));
      setThemeDark(isDark);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, [themeMode]);

  return children;
}
