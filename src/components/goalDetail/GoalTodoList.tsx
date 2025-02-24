'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import React, { useState } from 'react';
import cn from '@/utils/cn';
import GoalListItem from './GoalListItem';
import GoalTodoModal from './GoalTodoModal';

interface Todo {
  id: number;
  task: string;
  date: string;
  done: boolean;
}

interface Props {
  list: Todo[];
  onToggle: (id: number) => void;
  onAdd: (task: string, date: string) => void;
  goalId: string;
}

interface GroupedTodos {
  past: Record<string, Todo[]>;
  today: Record<string, Todo[]>;
  upcoming: Record<string, Todo[]>;
}

export default function GoalTodoList({ list, onToggle, onAdd, goalId }: Props) {
  const groupedTodos: GroupedTodos = { past: {}, today: {}, upcoming: {} };
  const today = new Date().toISOString().split('T')[0];
  const [isFutureFold, setIsFutureFold] = useState(true);
  const [isPastFold, setIsPastFold] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  list.forEach(({ id, task, date, done }) => {
    let category: keyof GroupedTodos;

    if (date < today) {
      category = 'past';
    } else if (date === today) {
      category = 'today';
    } else {
      category = 'upcoming';
    }

    // 날짜별 배열이 없으면 초기화
    groupedTodos[category][date] = groupedTodos[category][date] || [];
    groupedTodos[category][date].push({ id, task, done, date });
  });

  return (
    <div className="flex flex-1 flex-col gap-6 md:flex-row md:items-start">
      <div className="w-full rounded-2xl bg-gs00 p-6 shadow">
        {/* 헤더 */}
        <div className="flex items-center justify-between">
          <h3 className="mb-3 text-18R font-bold">To do</h3>
          <div
            className="cursor-pointer text-slate400"
            onClick={() => setIsModalOpen(true)}
          >
            + 할 일 추가
          </div>
        </div>

        {/* 오늘 할 일 */}
        <h3 className="mt-3 text-18R font-bold">오늘 할 일</h3>
        {groupedTodos.today[today]?.map((todo) => (
          <GoalListItem key={todo.id} item={todo} onToggle={onToggle} />
        ))}

        {/* 예정된 할 일 */}
        <div className="mt-6">
          <div className="flex items-center justify-between">
            <h3 className="mb-3 text-18R font-bold">예정된 할 일</h3>
            <FontAwesomeIcon
              className={cn(
                'h-4 w-4 text-gs500 transition-transform duration-300',
                isFutureFold ? 'rotate-180' : 'rotate-0',
              )}
              icon={faAngleDown}
              size="xl"
              onClick={() => setIsFutureFold((prev) => !prev)}
            />
          </div>
          <div className={isFutureFold ? 'hidden' : 'block max-h-96'}>
            {Object.entries(groupedTodos.upcoming).map(([date, todos]) => (
              <div key={date} className="relative mb-4">
                <div className="text-16M text-gs700">{date}</div>
                {todos.map((todo) => (
                  <GoalListItem key={todo.id} item={todo} onToggle={onToggle} />
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* 지난 할 일 */}
        <div className="mt-6">
          <div className="flex items-center justify-between">
            <h3 className="mb-3 text-18R font-bold">지난 할 일</h3>
            <FontAwesomeIcon
              className={cn(
                'h-4 w-4 text-gs500 transition-transform duration-300',
                isPastFold ? 'rotate-180' : 'rotate-0',
              )}
              icon={faAngleDown}
              size="xl"
              onClick={() => setIsPastFold((prev) => !prev)}
            />
          </div>
          <div className={isPastFold ? 'hidden' : 'block max-h-96'}>
            {Object.entries(groupedTodos.past).map(([date, todos]) => (
              <div key={date} className="relative mb-4">
                <div className="text-16M text-gs700">{date}</div>
                {todos.map((todo) => (
                  <GoalListItem key={todo.id} item={todo} onToggle={onToggle} />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 할 일 추가 모달 */}
      {isModalOpen && (
        <GoalTodoModal
          onClose={() => setIsModalOpen(false)}
          onAdd={onAdd}
          goalId={goalId}
        />
      )}
    </div>
  );
}
