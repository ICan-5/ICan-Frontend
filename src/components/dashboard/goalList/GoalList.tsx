'use client';

import { useState } from 'react';
import { useGoals } from '@/hooks/useGoals';
import GoalTab from './GoalTab';
import SimpleTodo from '@/components/common/todo/SimpleTodo';
import SimpleTodoSkeleton from '@/components/common/todo/SimpleTodoSkeleton';
import { useGoalTodo } from '@/hooks/useGoalsTodo';

export default function GoalList() {
  const [selectedGoalIndex, setSelectedGoalIndex] = useState<number>(0);
  const { data: goals, isFetching: isGoalsFetching } = useGoals();

  const selectedGoalId = goals?.[selectedGoalIndex]?.goalId || -1;
  const {
    todoItems,
    doneItems,
    isLoading: isTodoFetching,
  } = useGoalTodo(selectedGoalId, !isGoalsFetching && selectedGoalId !== -1);

  if (!isGoalsFetching && goals.length === 0)
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
      <div className="flex w-full flex-col gap-6 rounded-b-lg bg-gs00 px-6 py-4 md:flex-row">
        <section className="flex flex-col gap-3 md:flex-[3]">
          <p className="text-14SB">할일</p>
          <div className="w-full md:h-40 md:overflow-y-scroll 2xl:h-44">
            {isGoalsFetching && <SimpleTodoSkeleton />}
            {!isTodoFetching &&
              /** TODO :: 목표 데이터 받아오는 fetch, data로 변경 */
              todoItems.map((todo) => (
                <SimpleTodo
                  key={todo.todoId}
                  title={todo.title}
                  todoId={todo.todoId}
                  noteId={todo.noteId}
                />
              ))}
            {!isTodoFetching && todoItems.length === 0 && (
              <span className="relative block w-full text-center text-14M text-gs400 md:top-[70px] 2xl:top-[78px]">
                등록된 할일이 없습니다.
              </span>
            )}
          </div>
        </section>
        <section className="flex flex-col gap-3 md:flex-[2]">
          <p className="text-14SB">완료</p>
          <div className="w-full md:h-40 md:overflow-y-scroll 2xl:h-44">
            {isGoalsFetching && <SimpleTodoSkeleton />}
            {!isTodoFetching &&
              doneItems.map((todo) => (
                <SimpleTodo
                  key={todo.todoId}
                  title={todo.title}
                  todoId={todo.todoId}
                  noteId={todo.noteId}
                  done
                />
              ))}
            {!isTodoFetching && doneItems.length === 0 && (
              <span className="relative block w-full text-center text-14M text-gs400 md:top-[70px] 2xl:top-[78px]">
                완료된 할일이 없습니다.
              </span>
            )}
          </div>
        </section>
      </div>
    </>
  );
}
