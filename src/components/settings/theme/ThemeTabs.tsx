'use client';

import { useEffect, useState } from 'react';
import cn from '@/utils/cn';
import { THEMES } from '@/constants/thems';

export default function ThemeTab() {
  const [selectedTab, setSelectedTab] = useState<number>(2);

  const changeTheme = (index: number) => {
    setSelectedTab(index);
  };

  useEffect(() => {
    if (selectedTab === 0) {
      document.documentElement.setAttribute('data-theme', 'light');
    } else if (selectedTab === 1) {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
  }, [selectedTab]);

  return (
    <div className="flex w-full gap-2 rounded-xl bg-gs100 p-2">
      {THEMES.map((theme, index) => (
        <>
          <button
            className={cn('flex-1 rounded-xl px-2 py-1 text-16M', {
              'bg-gs00 text-gsBk': index === selectedTab,
              'text-gs400': index !== selectedTab,
            })}
            type="button"
            key={theme.value}
            onClick={() => changeTheme(index)}
          >
            {theme.text}
          </button>
          {index < THEMES.length - 1 && <div className="w-px bg-gs200" />}
        </>
      ))}
    </div>
  );
}
