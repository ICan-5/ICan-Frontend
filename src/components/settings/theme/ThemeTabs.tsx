'use client';

import { useEffect, useState } from 'react';
import cn from '@/utils/cn';
import { THEMES } from '@/constants/thems';
import { setTheme } from '@/services/theme';

interface Props {
  initialTheme: string;
}

export default function ThemeTab({ initialTheme }: Props) {
  const [selectedTab, setSelectedTab] = useState<string>(initialTheme);

  const changeTheme = async (theme: string) => {
    setSelectedTab(theme);
    await setTheme(theme);
  };

  useEffect(() => {
    if (selectedTab === 'light') {
      document.documentElement.setAttribute('data-theme', 'light');
    } else if (selectedTab === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
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
