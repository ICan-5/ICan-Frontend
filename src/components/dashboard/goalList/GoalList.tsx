'use client';

import { useState } from 'react';
import { useGoals } from '@/hooks/useGoals';
import GoalTab from './GoalTab';
import { Goal } from '@/types/goals';
import SimpleTodo from '@/components/common/todo/SimpleTodo';
import SimpleTodoSkeleton from '@/components/common/todo/SimpleTodoSkeleton';
import GoalTabSkeleton from './GoalTabSkeleton';
import { useDragScroll } from '@/hooks/useDragScroll';

export default function GoalList() {
  const { data: goalTabs, isFetching: isGoalTabsFetching } = useGoals();
  const [selectedGoalIndex, setSelectedGoalIndex] = useState<number>(0);
  const { scrollRef, handlePointerDown, handlePointerMove, handlePointerUp } =
    useDragScroll<HTMLDivElement>();

  if (!isGoalTabsFetching && goalTabs.length === 0)
    return (
      <div className="flex size-full min-h-60 items-center justify-center rounded-2xl border-2 border-dashed border-gs200 bg-gs50 text-14M text-gs400 2xl:rounded-[20px]">
        왼쪽 사이드바에서 새로운 목표를 추가해주세요.
      </div>
    );

  return (
    <>
      <div
        ref={scrollRef}
        className="flex w-full overflow-x-scroll [&::-webkit-scrollbar]:hidden"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
      >
        {isGoalTabsFetching && <GoalTabSkeleton />}
        {!isGoalTabsFetching &&
          goalTabs.map((goal: Goal, index: number) => (
            <GoalTab
              key={goal.goalId}
              title={goal.title}
              isSelected={index === selectedGoalIndex}
              onSelect={() => setSelectedGoalIndex(index)}
            />
          ))}
      </div>
      <div className="flex w-full flex-col gap-6 rounded-b-lg bg-gs00 px-6 py-4 md:flex-row">
        <section className="flex flex-col gap-3 md:flex-[3]">
          <p className="text-14SB">할일</p>
          <div className="w-full md:h-40 md:overflow-y-scroll 2xl:h-44">
            {isGoalTabsFetching && <SimpleTodoSkeleton />}
            {!isGoalTabsFetching &&
              /** TODO :: 목표 데이터 받아오는 fetch, data로 변경 */
              Array.from({ length: 5 }, (_, i) => i).map((e) => (
                <SimpleTodo key={e} title="hihihi" done={false} noteId={3} />
              ))}
          </div>
        </section>
        <section className="flex flex-col gap-3 md:flex-[2]">
          <p className="text-14SB">완료</p>
          <div className="w-full md:h-40 md:overflow-y-scroll 2xl:h-44">
            {isGoalTabsFetching && <SimpleTodoSkeleton />}
            {
              /** TODO :: 데이터 받아올때 변경 */
              !isGoalTabsFetching && (
                <span className="relative block w-full text-center text-14M text-gs400 md:top-[70px] 2xl:top-[78px]">
                  완료된 할일이 없습니다.
                </span>
              )
            }
          </div>
        </section>
      </div>
    </>
  );
}
