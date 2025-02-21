'use client';

import { config } from '@fortawesome/fontawesome-svg-core';
import { faAnglesRight, faFilePen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import Link from 'next/link';
import GoalBasket from '@/components/goalDetail/GoalBasket';
import GoalDoneList from '@/components/goalDetail/GoalDoneList';
import GoalHeader from '@/components/goalDetail/GoalHeader';
import GoalTodoList from '@/components/goalDetail/GoalTodoList';
import '@fortawesome/fontawesome-svg-core/styles.css';

config.autoAddCss = false;

type TodoItem = {
  id: number;
  task: string;
  date: string;
  done: boolean;
};

export default function Page({ params }: { params: { id: string } }) {
  const [todos, setTodos] = useState<TodoItem[]>([
    { id: 1, task: '운동하기', date: '2025-02-18', done: false },
    { id: 2, task: '책 읽기', date: '2025-02-21', done: false },
    { id: 3, task: '자바스크립트 1챕터', date: '2025-02-17', done: false },
    { id: 4, task: '친구들 만나기', date: '2025-02-26', done: false },
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
        return e;
      }),
    );
  };
  const deleteBasket = (id: number) => {
    setBaskets((prev) => prev.filter((e) => e.id !== id));
  };
  const pickDate = (id: number, date: Date | null) => {
    if (!date) return;
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;

    const { task } = baskets.filter((e) => e.id === id)[0];
    const newTodos = {
      id: Math.floor(Math.random() * 10000),
      task,
      date: formattedDate,
      done: false,
    };
    setTodos((prev) => [...prev, newTodos]);
    deleteBasket(id);
  };

  const addTodo = (task: string, date: string) => {
    const newTodo: TodoItem = {
      id: Math.floor(Math.random() * 10000),
      task,
      date,
      done: false,
    };
    setTodos((prev) => [...prev, newTodo]);
  };

  return (
    <div className="min-h-screen w-full bg-gs100 px-4 py-8 sm:px-8 lg:px-16 xl:px-24">
      <div className="mb-6 rounded-2xl bg-gs00 p-6 shadow">
        <GoalHeader
          doneItems={doneItems.length}
          todoItems={todoItems.length}
          id={params.id}
        />
      </div>
      <Link href={`${params.id}/note`} className="block">
        <div className="mb-6 cursor-pointer rounded-2xl bg-slate200 p-3 shadow">
          <h2 className="mb-4 flex items-center text-18SB">
            <FontAwesomeIcon icon={faFilePen} className="mr-2 text-slate500" />
            노트 모아보기
            <FontAwesomeIcon
              icon={faAnglesRight}
              className="ml-auto text-slate500"
            />
          </h2>
        </div>
      </Link>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <GoalTodoList list={todoItems} onToggle={toggleTodos} onAdd={addTodo} id={params.id}/>
        <div className="flex flex-col gap-4">
          <GoalDoneList list={doneItems} onToggle={toggleTodos} />
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
