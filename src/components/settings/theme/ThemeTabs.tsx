'use client';

import { useEffect, useState } from 'react';
import cn from '@/utils/cn';
import { THEMES } from '@/constants/thems';
import { setThemeDark, setThemeMode } from '@/services/theme';

interface Props {
  initialThemeMode: string;
}

export default function ThemeTab({ initialThemeMode }: Props) {
  const [selectedTab, setSelectedTab] = useState<string>(initialThemeMode);

  /**
   * theme모드를 변경하는 함수, 탭 클릭 시 실행
   * @param theme 'light', 'dark', 'system'
   */
  const changeTheme = async (theme: string) => {
    setSelectedTab(theme);
    await setThemeMode(theme);
  };

  /**
   * system모드가 dark인지 알려주는 함수
   * @returns system모드가 dark면 true, light면 false
   */
  const isSystemDark = () => {
    return !!window.matchMedia('(prefers-color-scheme: dark)').matches;
  };

  /**
   * 선택된 탭이 변할 때마다, document 속성과 themeDark를 변경
   */
  useEffect(() => {
    switch (selectedTab) {
      case 'light': {
        document.documentElement.setAttribute('data-dark', 'false');
        setThemeDark(false);
        break;
      }
      case 'dark': {
        document.documentElement.setAttribute('data-dark', 'true');
        setThemeDark(true);
        break;
      }
      case 'system': {
        const isDark = isSystemDark();
        document.documentElement.setAttribute('data-dark', String(isDark));
        setThemeDark(isDark);
        break;
      }
      default:
    }
  }, [selectedTab]);

  return (
    <div className="flex w-full gap-2 rounded-xl bg-gs100 p-2">
      {THEMES.map((theme, index) => (
        <div
          key={theme.value}
          className={cn('flex-1 rounded-xl px-2 py-1 text-center text-16M', {
            'bg-gs00 text-gsBk': theme.value === selectedTab,
            'text-gs400': theme.value !== selectedTab,
          })}
        >
          <button
            type="button"
            key={theme.value}
            onClick={() => changeTheme(theme.value)}
          >
            {theme.text}
          </button>
          {index < THEMES.length - 1 && <div className="w-px bg-gs200" />}
        </div>
      ))}
    </div>
  );
}
