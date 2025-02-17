'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import React, { useState } from 'react';
import cn from '@/utils/cn';
import GoalListItem from './GoalListItem';

type Todo = { id: number; task: string; date: string; done: boolean };

type Props = {
  list: Todo[];
  onToggle: (id: number) => void;
};

type GroupedTodos = {
  past: Record<string, Todo[]>;
  today: Record<string, Todo[]>;
  upcoming: Record<string, Todo[]>;
};

export default function GoalTodoList({ list, onToggle }: Props) {
  const groupedTodos: GroupedTodos = {
    past: {},
    today: {},
    upcoming: {},
  };
  const today = new Date().toISOString().split('T')[0];
  const [isFutureFold, setIsFutureFold] = useState<boolean>(true);
  const [isPastFold, setIsPastFold] = useState<boolean>(true);

  /**
   * todolist -> {날짜: todolist[]}[] 형식으로 변환해주는 함수
   */
  list.forEach(({ id, task, date, done }) => {
    let category: keyof GroupedTodos;

    if (date < today) {
      category = 'past';
    } else if (date === today) {
      category = 'today';
    } else {
      category = 'upcoming';
    }

    if (!groupedTodos[category][date]) {
      groupedTodos[category][date] = [];
    }

    groupedTodos[category][date].push({ id, task, done, date });
  });

  return (
    <div className="flex flex-1 flex-col gap-6 md:flex-row md:items-start">
      <div className="w-full rounded-2xl bg-gs00 p-6 shadow">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="mb-4 text-18R font-bold">To do</h3>
          <div className="flex cursor-pointer items-center">
            <span className="text-slate400">+ 할 일 추가</span>
          </div>
        </div>
        <h3 className="mt-6 text-18R font-bold">오늘 할 일</h3>
        {groupedTodos.today[today] &&
          groupedTodos.today[today].map((todo) => (
            <GoalListItem key={todo.id} item={todo} onToggle={onToggle} />
          ))}
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
          <div className={`max-h-96 ${isFutureFold && 'hidden'}`}>
            {Object.entries(groupedTodos.upcoming).map(([date, todos]) => (
              <div key={date} className="relative mb-4">
                <div className="text-16M text-gs700">{date}</div>
                <div>
                  {todos.map((todo: Todo) => (
                    <GoalListItem
                      key={todo.id}
                      item={todo}
                      onToggle={onToggle}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
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
          <div className={`max-h-96 ${isPastFold && 'hidden'}`}>
            {Object.entries(groupedTodos.past).map(([date, todos]) => (
              <div key={date} className="relative mb-4">
                <div className="text-16M text-gs700">{date}</div>
                <div>
                  {todos.map((todo: Todo) => (
                    <GoalListItem
                      key={todo.id}
                      item={todo}
                      onToggle={onToggle}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
