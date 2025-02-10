'use client';

import { faFlag } from '@fortawesome/free-regular-svg-icons/faFlag';
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons/faAngleDown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import cn from '@/utils/cn';
import NavGoalItem from './NavGoalItem';

const goals = [
  { id: 1, title: '자바스크립트 공부하기' },
  { id: 2, title: '리액트 공부하기' },
  { id: 3, title: '리액트 공부하기' },
  { id: 4, title: '리액트 공부하기' },
  { id: 5, title: '리액트 공부하기' },
  { id: 12, title: '리액트 공부하기' },
  { id: 13, title: '리액트 공부하기' },
  { id: 14, title: '리액트 공부하기' },
  { id: 15, title: '리액트 공부하기' },
  { id: 212, title: '리액트 공부하기' },
  { id: 213, title: '리액트 공부하기' },
  { id: 214, title: '리액트 공부하기' },
  { id: 215, title: '리액트 공부하기' },
  { id: 314, title: '리액트 공부하기' },
  { id: 315, title: '리액트 공부하기' },
  { id: 3212, title: '리액트 공부하기' },
  { id: 3213, title: '리액트 공부하기' },
  { id: 3214, title: '리액트 공부하기' },
  { id: 3215, title: '리액트 공부하기' },
];

export default function NavGoal() {
  const pathname = usePathname();
  const [isFolded, setIsFolded] = useState<boolean>(false);

  const foldGoalList = () => {
    setIsFolded((prev) => !prev);
  };

  const addGoallist = (event: React.MouseEvent) => {
    event?.stopPropagation();
  };

  return (
    <div className={cn('flex h-full flex-col overflow-y-hidden')}>
      <div
        className={cn(
          'flex flex-none items-center gap-3 overflow-hidden whitespace-nowrap rounded-md p-2 text-gray-400',
          {
            'bg-secondary text-primary': pathname.startsWith('/goals'),
          },
        )}
      >
        <div className={cn('flex items-center justify-center')}>
          <FontAwesomeIcon className={cn('h-4 w-4')} icon={faFlag} size="sm" />
        </div>
        <p className={cn('text-m flex-1 text-left font-medium')}>목표</p>
        <button
          className={cn(
            'flex h-5 w-5 items-center justify-center rounded-md hover:bg-gray-100',
          )}
          type="button"
          onClick={foldGoalList}
        >
          <FontAwesomeIcon
            className={cn('h-4 w-4 transition-transform duration-300', {
              'rotate-180': !isFolded,
              'rotate-0': isFolded,
            })}
            icon={faAngleDown}
            size="2xs"
          />
        </button>
        <button
          className={cn(
            'flex h-5 w-5 items-center justify-center rounded-md bg-primary',
          )}
          type="button"
          onClick={addGoallist}
        >
          <FontAwesomeIcon
            className={cn('h-3 w-3 text-white')}
            icon={faPlus}
            size="2xs"
          />
        </button>
      </div>
      <ul
        className={cn(
          'flex h-full flex-col gap-1 overflow-y-auto overflow-x-hidden whitespace-nowrap transition-transform duration-300',
          { hidden: isFolded },
        )}
      >
        {goals.map((goal) => (
          <NavGoalItem id={goal.id} title={goal.title} key={goal.id} />
        ))}
      </ul>
    </div>
  );
}
