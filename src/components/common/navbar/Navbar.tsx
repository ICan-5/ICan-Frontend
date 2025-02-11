'use client';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons/faAngleRight';
import cn from '@/utils/cn';
import NavProfile from './NavProfile';
import NavTab from './NavTab';

export default function Navbar() {
  const [isFolded, setIsFolded] = useState<boolean>(false);

  return (
    <header
      className={cn(
        'relative left-0 top-0 flex h-screen flex-none flex-col items-start bg-white p-4 transition-all duration-300',
        { 'w-16': isFolded, 'w-60': !isFolded },
      )}
    >
      <button
        className={cn(
          'absolute right-[-12px] top-10 z-10 flex h-6 w-6 items-center justify-center rounded-2xl border-2 border-slate-200 bg-white transition-transform duration-300',
          { 'rotate-0 overflow-y-hidden': isFolded, 'rotate-180': !isFolded },
        )}
        type="button"
        onClick={() => setIsFolded(!isFolded)}
      >
        <FontAwesomeIcon className="h-3 w-3" icon={faAngleRight} size="2xs" />
      </button>
      <NavProfile />
      <NavTab />
    </header>
  );
}
