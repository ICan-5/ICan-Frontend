'use client';

import { faFontAwesome } from '@fortawesome/free-solid-svg-icons/faFontAwesome';
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
  { id: 2, title: '리액트 공부하기' },
  { id: 3, title: 'Next14 공부하기' },
  { id: 2, title: '리액트 공부하기' },
  { id: 3, title: 'Next14 공부하기' },
  { id: 2, title: '리액트 공부하기' },
  { id: 3, title: 'Next14 공부하기' },
  { id: 2, title: '리액트 공부하기' },
  { id: 3, title: 'Next14 공부하기' },
  { id: 2, title: '리액트 공부하기' },
  { id: 3, title: 'Next14 공부하기' },
  { id: 2, title: '리액트 공부하기' },
  { id: 3, title: 'Next14 공부하기' },
];

type Props = {
  headerFolded: boolean;
};

export default function NavGoal({ headerFolded }: Props) {
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
          'flex flex-none items-center gap-2 overflow-hidden whitespace-nowrap rounded-lg px-1 py-2 text-gs600',
          '2xl:rounded-xl 2xl:px-2 2xl:py-3',
          { 'bg-slate50 text-gsBk': pathname.startsWith('/goals') },
        )}
      >
        <div
          className={cn(
            'flex h-7 w-7 items-center justify-center transition-all duration-300',
            {
              'w-10 p-3 2xl:p-2': headerFolded,
            },
          )}
        >
          <FontAwesomeIcon className="h-4 w-4" icon={faFontAwesome} size="sm" />
        </div>
        <p className="flex-1 text-left text-14M font-medium 2xl:text-16M">
          목표
        </p>
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
          className={cn(
            'flex h-6 w-6 items-center justify-center rounded-2xl border border-gs200 bg-gs00 text-gs400',
            'hover:border-slate500 hover:text-slate500 2xl:h-7 2xl:w-7',
          )}
          type="button"
          onClick={addGoalList}
        >
          <FontAwesomeIcon className="h-4 w-4" icon={faPlus} size="2xs" />
        </button>
      </div>
      <div
        className={cn(
          'relative flex h-full max-h-[328px] flex-col overflow-y-auto overflow-x-hidden whitespace-nowrap py-2 pl-6 2xl:max-h-[368px]',
          'origin-top transition-transform duration-300 ease-in-out',
          { 'scale-y-0': isFolded },
          { 'invisible overflow-hidden': headerFolded },
        )}
      >
        {showNewGoal && (
          <NewGoalItem
            onCloseInput={() => setShowNewGoal(false)}
            onAddNewItem={(newItem) =>
              setGoalList((prev) => [...prev, newItem])
            }
          />
        )}
        {goalList.map((goal) => (
          <NavGoalItem
            id={goal.id}
            title={goal.title}
            isSelected={pathname === `/goals/${goal.id}`}
            key={goal.id}
          />
        ))}
      </div>
    </div>
  );
}
