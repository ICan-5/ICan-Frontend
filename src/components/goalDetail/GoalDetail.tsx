import { useState, useRef, useEffect, Dispatch, SetStateAction } from 'react';
import GoalList from '@/components/goalDetail/GoalTodoList';
import GoalBasket from '@/components/goalDetail/GoalBasket';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';
config.autoAddCss = false;

interface TodoItem {
  id: number;
  task: string;
  date: string;
  done: boolean;
}

interface GoalDetailProps {
  todos: TodoItem[];
  baskets: string[];
  setTodos: Dispatch<SetStateAction<TodoItem[]>>;
  setBaskets: Dispatch<SetStateAction<string[]>>;
}

export default function GoalDetail({
  todos,
  setTodos,
  baskets,
  setBaskets,
}: GoalDetailProps) {
  const todoItems = todos.filter((item) => !item.done);
  const doneItems = todos.filter((item) => item.done);

  return (
    <div>
      <div className="flex flex-col gap-6 md:flex-row md:items-start">
        <div className="basis-1/2 rounded-2xl bg-white p-6 shadow">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="mb-4 text-lg font-bold">To do</h3>
            <span className="text-blue-400">+ 할 일 추가</span>
          </div>
          <h3 className="mt-6 text-lg font-bold">오늘 할 일</h3>
        </div>
      </div>
    </div>
  );
}
