'use client';

import { useEffect, useState } from 'react';
import { useGoals } from '@/hooks/useGoals';
import GoalTab from './GoalTab';
import { Goal } from '@/types/goals';
import SimpleTodo from '@/components/common/todo/SimpleTodo';

export default function GoalList() {
  const { data: goalList, isFetching } = useGoals();

  const [selectedGoalId, setSelectedGoalId] = useState<number | null>(null);

  useEffect(() => {
    if (goalList && goalList.length > 0) {
      setSelectedGoalId(goalList[0].goalId);
    }
  }, [goalList]);

  if (isFetching) return <div>fetching...</div>;

  if (goalList.length === 0)
    <div className="flex size-full min-h-60 items-center justify-center rounded-2xl border-2 border-dashed border-gs200 bg-gs50 text-14M text-gs400 2xl:rounded-[20px]">
      왼쪽 사이드바에서 새로운 목표를 추가해주세요.
    </div>;

  return (
    <>
      <div className="flex w-full overflow-x-scroll [&::-webkit-scrollbar]:hidden">
        {goalList.map((goal: Goal) => (
          <GoalTab
            key={goal.goalId}
            title={goal.title}
            isSelected={goal.goalId === selectedGoalId}
            onSelect={() => setSelectedGoalId(goal.goalId)}
          />
        ))}
      </div>
      <div className="flex w-full flex-col gap-6 rounded-b-lg bg-gs00 px-6 py-4 md:flex-row">
        <section className="flex flex-col gap-3 md:flex-[3]">
          <p className="text-14SB">할일</p>
          <div className="w-full md:h-40 md:overflow-y-scroll 2xl:h-44">
            {Array.from({ length: 5 }, (_, i) => i).map((e) => (
              <SimpleTodo key={e} title="hihihi" done={false} noteId={3} />
            ))}
          </div>
        </section>
        <section className="flex flex-col gap-3 md:flex-[2]">
          <p className="text-14SB">완료</p>
          <div className="w-full md:h-40 md:overflow-y-scroll 2xl:h-44">
            <span className="relative block w-full text-center text-14M text-gs500 md:top-[70px] 2xl:top-[78px]">
              완료된 할일이 없습니다.
            </span>
          </div>
        </section>
      </div>
    </>
  );
}
