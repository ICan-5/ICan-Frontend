'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons/faAngleRight';
import Link from 'next/link';
import cn from '@/utils/cn';
import NavUserProfile from './NavUserProfile';
import NavTab from './NavTab';
import { useNavbar } from '../NavbarContext';

export default function Navbar() {
  const { isFolded, toggleNavbar } = useNavbar();

  return (
    <>
      <nav
        className={cn(
          'fixed top-0 z-30 flex h-screen flex-none flex-col items-start bg-white py-4 transition-all duration-300 first-line:left-0 md:relative 2xl:py-5',
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
          onClick={toggleNavbar}
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
        <Link
          href="/"
          className={cn(
            'flex h-9 rounded-lg p-[3px] text-18SB transition-transform duration-300 2xl:h-10',
          )}
        >
          I:Can
        </Link>
        <NavUserProfile isFolded={isFolded} />
        <NavTab isFolded={isFolded} />
      </nav>
      <div
        className={cn('md:hidden', {
          'fixed inset-0 z-20 bg-black bg-opacity-50': !isFolded,
        })}
        onClick={toggleNavbar}
      />
    </>
  );
}
