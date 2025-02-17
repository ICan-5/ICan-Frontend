'use client';

import GoalBasket from '@/components/goalDetail/GoalBasket';
import GoalHeader from '@/components/goalDetail/GoalHeader';
import GoalTodoList from '@/components/goalDetail/GoalTodoList';
import { faAnglesRight, faStickyNote } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';

interface TodoItem {
  id: number;
  task: string;
  date: string;
  done: boolean;
}

export default function Page() {
  const [todos, setTodos] = useState<TodoItem[]>([
    { id: 1, task: '운동하기', date: '2025-02-11', done: false },
    { id: 2, task: '책 읽기', date: '2025-02-14', done: false },
    { id: 3, task: '자바스크립트 1챕터', date: '2025-02-14', done: false },
    { id: 4, task: '친구들 만나기', date: '2025-02-20', done: false },
  ]);
  const [baskets, setBaskets] = useState<{ id: number; task: string }[]>([
    { id: 1, task: '스터디 준비하기' },
    { id: 2, task: '집안일 하기' },
  ]);

  const todoItems = todos.filter((item) => !item.done);
  const doneItems = todos.filter((item) => item.done);

  const toggleTodos = (id: number) => {
    setTodos((prev) =>
      prev.map((e) => {
        if (e.id === id) return { ...e, done: !e.done };
        else return e;
      }),
    );
  };

  const pickDate = (id: number, date: Date | null) => {
    if (!date) return;
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;

    // 실제로는 API로 장바구니 해당 id POST한 뒤,
    // 응답으로 생성된 todo에서의 id를 받아서 todoItems에 넣어야함
    const { task } = baskets.filter((e) => e.id === id)[0];
    const newTodos = {
      id: Math.floor(Math.random() * 10000),
      task: task,
      date: formattedDate,
      done: false,
    };
    setTodos((prev) => [...prev, newTodos]);
    deleteBasket(id);
  };

  const deleteBasket = (id: number) => {
    setBaskets((prev) => prev.filter((e) => e.id !== id));
  };

  return (
    <div className="min-h-screen w-full bg-gray-100 px-4 py-8 sm:px-8 lg:px-16 xl:px-24">
      <div className="mb-6 rounded-2xl bg-white p-6 shadow">
        <GoalHeader doneItems={doneItems.length} todoItems={todoItems.length} />
      </div>
      <div className="mb-6 rounded-2xl bg-blue-100 p-3 shadow">
        <h2 className="mb-4 flex items-center text-lg font-bold">
          <FontAwesomeIcon icon={faStickyNote} className="mr-2 text-blue-400" />
          노트 모아보기
          <FontAwesomeIcon
            icon={faAnglesRight}
            className="ml-auto text-blue-400"
          />
        </h2>
      </div>
      <div className="flex w-full gap-4">
        <GoalTodoList type="todo" list={todoItems} onToggle={toggleTodos} />
        <div className="flex flex-1 flex-col gap-4">
          <GoalTodoList type="done" list={doneItems} onToggle={toggleTodos} />
          <GoalBasket
            basketItems={baskets}
            onPickDate={pickDate}
            onDelete={deleteBasket}
          />
        </div>
      </div>
    </div>
  );
}
