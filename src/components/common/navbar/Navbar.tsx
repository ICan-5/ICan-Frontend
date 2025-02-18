'use client';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons/faAngleRight';
import cn from '@/utils/cn';
import NavUserProfile from './NavUserProfile';
import NavTab from './NavTab';

export default function Navbar() {
  const [isFolded, setIsFolded] = useState<boolean>(false);

  return (
    <header
      className={cn(
        'relative left-0 top-0 flex h-screen flex-none flex-col items-start bg-white py-4 transition-all duration-300 2xl:py-5',
        {
          'w-16 px-2': isFolded,
          'w-64 px-4 2xl:w-80 2xl:px-6': !isFolded,
        },
      )}
    >
      <button
        className={cn(
          'absolute right-0 top-20 z-10 flex h-10 w-5 items-center justify-center rounded-l-md bg-slate50',
        )}
        type="button"
        onClick={() => setIsFolded(!isFolded)}
      >
        <FontAwesomeIcon
          className={cn('h-3 w-3 transition-transform duration-300', {
            'rotate-0 overflow-y-hidden': isFolded,
            'rotate-180': !isFolded,
          })}
          icon={faAngleRight}
          size="2xs"
        />
      </button>
      <div
        className={cn(
          'flex h-9 w-full max-w-24 items-center justify-center rounded-lg bg-gs200 transition-transform duration-300 2xl:h-10',
        )}
      >
        I:)an
      </div>
      <NavUserProfile isFolded={isFolded} />
      <NavTab isFolded={isFolded} />
    </header>
  );
}
