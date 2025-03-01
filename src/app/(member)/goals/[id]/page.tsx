'use client';

import { config } from '@fortawesome/fontawesome-svg-core';
import {
  faAnglesRight,
  faFilePen,
  faSpinner,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import GoalBasket from '@/components/goalDetail/GoalBasket';
import GoalDoneList from '@/components/goalDetail/GoalDoneList';
import GoalHeader from '@/components/goalDetail/GoalHeader';
import GoalTodoList from '@/components/goalDetail/GoalTodoList';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { Todo, Basket } from '@/types/todos';

config.autoAddCss = false;

export default function Page({ params }: { params: { id: string } }) {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [baskets, setBaskets] = useState<Basket[]>([]);
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

  const toggleTodos = async (todoId: number) => {
    const todo = todos.find((t) => t.todoId === todoId);
    if (!todo) return;
    const updatedFields = {
      done: !todo.done,
      goalId: todo.goal ? todo.goal.goalId : undefined,
      title: todo.title,
      date: todo.date,
    };
    const response = await fetch(`/api/goals/${params.id}/todos/${todoId}`, {
      method: 'PATCH',
      body: JSON.stringify(updatedFields),
    });

    if (!response.ok) {
      throw new Error('Failed to update todo');
    }

    setTodos((prev) =>
      prev.map((t) => (t.todoId === todoId ? { ...t, done: !t.done } : t)),
    );
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
        <div className="flex h-full items-center justify-center">
          <FontAwesomeIcon
            icon={faSpinner}
            spin
            className="text-4xl text-slate500"
          />
          <span className="ml-2 text-lg text-slate400" />
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <GoalTodoList
            list={todoItems}
            onToggle={toggleTodos}
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
            <GoalBasket basketItems={baskets} />
          </div>
        </div>
      )}
    </div>
  );
}
