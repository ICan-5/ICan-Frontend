'use client';

import { useState } from 'react';
import cn from '@/utils/cn';
import Profile from './Profile';

export default function Navbar() {
  const [isCollapsed, SetIsCollapsed] = useState<boolean>(false);

  return (
    <header
      className={cn(
        'relative left-0 top-0 flex h-screen flex-col items-start bg-white p-4 transition-all duration-300',
        isCollapsed ? 'w-16' : 'w-60',
      )}
    >
      <button
        className={cn(
          'absolute right-[-12px] top-10 z-10 flex h-6 w-6 items-center justify-center rounded-2xl border-2 border-slate-200 bg-white transition-transform duration-300',
          isCollapsed ? 'rotate-180' : 'rotate-0',
        )}
        type="button"
        onClick={() => SetIsCollapsed(!isCollapsed)}
      >
        {'<'}
      </button>
      <Profile />
      <nav />
    </header>
  );
}
