'use client';

import { MouseEvent, useCallback } from 'react';
import cn from '@/utils/cn';
import { useDragScroll } from '@/hooks/useDragScroll';
import { Goal } from '@/types/goals';
import GoalTabSkeleton from './GoalTabSkeleton';

interface Props {
  isFetching: boolean;
  goals: Goal[];
  selectedIndex: number;
  onSelect: (index: number) => void;
}

export default function GoalTab({
  isFetching,
  goals,
  selectedIndex,
  onSelect,
}: Props) {
  const {
    scrollRef,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleMouseLeave,
  } = useDragScroll<HTMLDivElement>();

  const isSelected = useCallback(
    (index: number) => {
      return index === selectedIndex;
    },
    [selectedIndex],
  );

  if (isFetching) return <GoalTabSkeleton />;

  /**
   * @param event 목표 탭 클릭 이벤트
   * 탭을 부모의 중앙으로 이동시켜주는 함수
   */
  const scrollToCenter = (event: MouseEvent<HTMLButtonElement>) => {
    event.currentTarget.scrollIntoView({
      behavior: 'smooth',
      inline: 'center',
      block: 'nearest',
    });
  };

  /**
   * @param event 목표 탭 클릭 이벤트
   * @param index 클릭 이벤트가 발생한 목표 탭 인덱스
   * onSelect함수 호출
   * 클릭된 탭의 위치가 중앙에서 많이 벗어났을 경우 scrollToCenter함수 호출
   */
  const clickTab = (event: MouseEvent<HTMLButtonElement>, index: number) => {
    onSelect(index);

    const tab = event.currentTarget;
    const tabContainer = tab.parentElement; // 탭들이 감싸진 부모 요소

    if (!tabContainer) return;

    const { left: containerLeft, width: containerWidth } =
      tabContainer.getBoundingClientRect();
    const { left: tabLeft, right: tabRight } = tab.getBoundingClientRect();

    const containerCenter = containerLeft + containerWidth / 2; // 컨테이너 중앙
    const tabCenter = (tabLeft + tabRight) / 2; // 클릭한 탭 중앙

    const threshold = containerWidth * 0.4; // 어느 정도 벗어나야 움직일지 결정 (40% 정도)

    if (Math.abs(tabCenter - containerCenter) > threshold) {
      scrollToCenter(event);
    }
  };

  return (
    <div
      ref={scrollRef}
      className="flex w-full overflow-x-scroll [&::-webkit-scrollbar]:hidden"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
    >
      {goals?.map((goal: Goal, index: number) => (
        <button
          type="button"
          key={goal.goalId}
          className={cn(
            'relative h-9 flex-none overflow-hidden text-ellipsis whitespace-nowrap break-words rounded-t-lg bg-gs50 px-3 py-2 text-left text-14M text-gs400 transition-all duration-150',
            { 'w-40 bg-gs00 text-gsBk md:w-56': isSelected(index) },
            {
              'w-20 border-x border-t border-gs200 md:w-32': !isSelected(index),
            },
          )}
          onClick={(e) => clickTab(e, index)}
        >
          <span
            className={cn(
              'invisible absolute left-0 top-1/2 h-6 w-[2px] -translate-y-1/2 bg-slate500',
              { visible: isSelected(index) },
            )}
          />
          {goal.title}
        </button>
      ))}
    </div>
  );
}
