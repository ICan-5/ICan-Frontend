'use client';

import { useState } from 'react';
import cn from '@/utils/cn';
import NavProfile from './NavProfile';
import NavTab from './NavTab';

export default function Navbar() {
  const [isFolded, setIsFolded] = useState<boolean>(false);
  return (
    <header
      className={cn(
        'relative left-0 top-0 flex h-screen flex-col items-start bg-white p-4 transition-all duration-300',
        isFolded ? 'w-16' : 'w-60',
      )}
    >
      <button
        className={cn(
          'absolute right-[-12px] top-10 z-10 flex h-6 w-6 items-center justify-center rounded-2xl border-2 border-slate-200 bg-white transition-transform duration-300',
          isFolded ? 'rotate-180' : 'rotate-0',
        )}
        type="button"
        onClick={() => setIsFolded(!isFolded)}
      >
        {'<'}
      </button>
      <NavProfile />
      <NavTab />
    </header>
  );
}
