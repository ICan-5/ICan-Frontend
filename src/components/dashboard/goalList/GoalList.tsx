'use client';

import { useState } from 'react';
import { useGoals } from '@/hooks/useGoals';
import GoalTab from './GoalTab';
import { useGoalTodo } from '@/hooks/useGoalsTodo';
import GoalDoneSection from './GoalDoneSection';
import GoalTodoSection from './GoalTodoSection';

export default function GoalList() {
  const [selectedGoalIndex, setSelectedGoalIndex] = useState<number>(0);
  const { data: goals, isFetching: isGoalsFetching } = useGoals();

  const selectedGoalId = goals?.[selectedGoalIndex]?.goalId || -1;
  const {
    todoItems,
    doneItems,
    isLoading: isTodoFetching,
  } = useGoalTodo(selectedGoalId, !isGoalsFetching && selectedGoalId !== -1);

  if (!isGoalsFetching && goals?.length === 0)
    return (
      <div className="flex size-full min-h-60 items-center justify-center rounded-2xl border-2 border-dashed border-gs200 bg-gs50 text-14M text-gs400 2xl:rounded-[20px]">
        왼쪽 사이드바에서 새로운 목표를 추가해주세요.
      </div>
    );

  return (
    <>
      <GoalTab
        isFetching={isGoalsFetching}
        goals={goals}
        selectedIndex={selectedGoalIndex}
        onSelect={(index) => setSelectedGoalIndex(index)}
      />
      <div className="flex w-full flex-col gap-6 overflow-x-hidden rounded-b-lg bg-gs00 px-6 py-4 md:flex-row">
        <GoalTodoSection
          isFetching={isGoalsFetching || isTodoFetching}
          todoItems={todoItems}
        />
        <GoalDoneSection
          isFetching={isGoalsFetching || isTodoFetching}
          doneItems={doneItems}
        />
      </div>
    </>
  );
}
