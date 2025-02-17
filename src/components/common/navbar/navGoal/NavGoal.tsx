'use client';

import { faFlag } from '@fortawesome/free-regular-svg-icons/faFlag';
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons/faAngleDown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import cn from '@/utils/cn';
import NavGoalItem from './NavGoalItem';
import NewGoalItem from './NewGoalItem';

// TODO:: 목표 리스트 mock 데이터, API 연결하면 삭제
const tempGoalList = [
  { id: 1, title: '자바스크립트 공부하기' },
  { id: 2, title: '리액트 공부하기' },
  { id: 3, title: 'Next14 공부하기' },
];

export default function NavGoal() {
  const pathname = usePathname();
  const [goalList, setGoalList] = useState(tempGoalList);
  const [isFolded, setIsFolded] = useState<boolean>(false);
  const [showNewGoal, setShowNewGoal] = useState<boolean>(false);

  /**
   * 목표 리스트 접기/펼치기 함수
   */
  const foldGoalList = () => {
    setIsFolded((prev) => !prev);
  };

  /**
   * @param event 마우스 이벤트
   * 새로운 목표 생성 & 목표 리스트가 접혀져있다면 펼치기 함수
   */
  const addGoalList = (event: React.MouseEvent) => {
    event?.stopPropagation();
    setShowNewGoal(true);
    if (isFolded) setIsFolded(false);
  };

  return (
    <div className="flex h-full flex-col overflow-y-hidden">
      <div
        className={cn(
          'flex flex-none items-center gap-3 overflow-hidden whitespace-nowrap rounded-md px-2 py-3 text-gray-400',
          {
            'bg-secondary text-primary': pathname.startsWith('/goals'),
          },
        )}
      >
        <div className="flex h-7 w-7 items-center justify-center">
          <FontAwesomeIcon className="h-4 w-4" icon={faFlag} size="sm" />
        </div>
        <p className="text-m flex-1 text-left font-medium">목표</p>
        <button
          className="flex h-5 w-5 items-center justify-center rounded-md"
          type="button"
          onClick={foldGoalList}
        >
          <FontAwesomeIcon
            className={cn('h-4 w-4 transition-transform duration-300', {
              'rotate-0': !isFolded,
              'rotate-180': isFolded,
            })}
            icon={faAngleDown}
            size="2xs"
          />
        </button>
        <button
          className="flex h-5 w-5 items-center justify-center rounded-md bg-primary"
          type="button"
          onClick={addGoalList}
        >
          <FontAwesomeIcon
            className="h-3 w-3 text-white"
            icon={faPlus}
            size="2xs"
          />
        </button>
      </div>
      <div
        className={cn(
          'flex h-full flex-col gap-1 overflow-y-auto overflow-x-hidden whitespace-nowrap py-2',
          'origin-top transition-transform duration-300 ease-in-out',
          { 'scale-y-0': isFolded },
        )}
      >
        {goalList.map((goal) => (
          <NavGoalItem
            id={goal.id}
            title={goal.title}
            isSelected={pathname === `/goals/${goal.id}`}
            key={goal.id}
          />
        ))}
        {showNewGoal && (
          <NewGoalItem
            onCloseInput={() => setShowNewGoal(false)}
            onAddNewItem={(newItem) =>
              setGoalList((prev) => [...prev, newItem])
            }
          />
        )}
      </div>
    </div>
  );
}
