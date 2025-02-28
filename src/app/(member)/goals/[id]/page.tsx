'use client';

import { config } from '@fortawesome/fontawesome-svg-core';
import { faAnglesRight, faFilePen, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import GoalBasket from '@/components/goalDetail/GoalBasket';
import GoalDoneList from '@/components/goalDetail/GoalDoneList';
import GoalHeader from '@/components/goalDetail/GoalHeader';
import GoalTodoList from '@/components/goalDetail/GoalTodoList';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { Goal } from '@/types/goals';

config.autoAddCss = false;

interface TodoItem {
  todoId: number;
  title: string;
  date: string;
  done: boolean;
  noteId?: number | null;
  goal: Goal | null;
}

interface BasketItem {
  id: number;
  title: string;
  goalId: string | null;
  createdAt: string;
}

export default function Page({ params }: { params: { id: string } }) {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [baskets, setBaskets] = useState<BasketItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async (goalId: string) => {
      setLoading(true);

      try {
        const url = `/api/goals/${goalId}/todos`; 

        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`Failed to fetch data`);
        }

        const data = await response.json();

        if (Array.isArray(data.todos)) {
          setTodos(data.todos);
        }

        if (Array.isArray(data.basketTodos)) {
          setBaskets(data.basketTodos); 
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData(params.id);
  }, [params.id]);

  const todoItems = todos.filter((item) => !item.done);
  const doneItems = todos.filter((item) => item.done);

  const toggleTodos = (todoId: number) => {
    setTodos((prev) =>
      prev.map((e) => {
        if (e.todoId === todoId) {
          return { ...e, done: !e.done };
        }
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

    const { title } = baskets.filter((e) => e.id === id)[0];
    const newTodos = {
      todoId: Date.now() + Math.floor(Math.random() * 1000),
      title,
      date: formattedDate,
      done: false,
      goal: null,
    };
    setTodos((prev) => [...prev, newTodos]);
    deleteBasket(id);
  };

  const addTodo = (title: string, date: string) => {
    const newTodo: TodoItem = {
      todoId: Date.now() + Math.floor(Math.random() * 1000),
      title,
      date,
      done: false,
      goal: null,
    };
    setTodos((prev) => [...prev, newTodo]);
  };

  return (
    <div className="relative left-1/2 size-full max-w-screen-xl -translate-x-1/2 bg-gs100">
      <div className="mb-6 h-[136px] rounded-2xl bg-gs00 p-6 shadow">
        <GoalHeader
          doneItems={doneItems.length}
          todoItems={todoItems.length}
          id={params.id}
        />
      </div>
      <Link href={`${params.id}/note`} className="block">
        <div className="mb-6 h-[60px] cursor-pointer rounded-2xl bg-slate100 px-6 py-4 shadow">
          <h2 className="flex items-center text-18SB">
            <FontAwesomeIcon icon={faFilePen} className="mr-2 text-slate500" />
            노트 모아보기
            <FontAwesomeIcon
              icon={faAnglesRight}
              className="ml-auto text-slate500"
            />
          </h2>
        </div>
      </Link>

      {loading ? (
        <div className="flex justify-center items-center h-full">
        <FontAwesomeIcon icon={faSpinner} spin className="text-slate500 text-4xl" />
        <span className="ml-2 text-slate400 text-lg"></span>
      </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <GoalTodoList
            list={todoItems}
            onToggle={toggleTodos}
            onAdd={addTodo}
            goalId={params.id}
          />
          <div className="flex flex-col gap-8">
            <GoalDoneList
              list={doneItems.map((item) => ({
                ...item,
                noteId: item.noteId ?? null,
              }))}
              onToggle={toggleTodos}
            />
            <GoalBasket
              basketItems={baskets}
              onPickDate={pickDate}
              onDelete={deleteBasket}
            />
          </div>
        </div>
      )}
    </div>
  );
}
