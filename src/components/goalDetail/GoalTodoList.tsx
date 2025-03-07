'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import React, { useState } from 'react';
import cn from '@/utils/cn';
import CheckTodo from '@/components/common/todo/CheckTodo';
import GoalTodoModal from './GoalTodoModal';
import { Todo } from '@/types/todos';

interface Props {
  list: Todo[];
  onToggle: (id: number) => void;
  goalId: string;
}

interface GroupedTodos {
  past: Record<string, Todo[]>;
  today: Todo[];
  upcoming: Record<string, Todo[]>;
}

export default function GoalTodoList({ list, onToggle, goalId }: Props) {
  const groupedTodos: GroupedTodos = { past: {}, today: [], upcoming: {} };
  const today = new Date().toLocaleDateString('sv-SE');

  const [isFutureFold, setIsFutureFold] = useState(false);
  const [isPastFold, setIsPastFold] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  list.forEach(({ todoId, title, date, done, noteId, goal, createdAt }) => {
    if (date < today) {
      groupedTodos.past[date] = groupedTodos.past[date] || [];
      groupedTodos.past[date].push({
        todoId,
        title,
        done,
        date,
        noteId,
        goal,
        createdAt,
      });
    } else if (date === today) {
      groupedTodos.today.push({
        todoId,
        title,
        done,
        date,
        noteId,
        goal,
        createdAt,
      });
    } else {
      groupedTodos.upcoming[date] = groupedTodos.upcoming[date] || [];
      groupedTodos.upcoming[date].push({
        todoId,
        title,
        done,
        date,
        noteId,
        goal,
        createdAt,
      });
    }
  });

  return (
    <div className="relative h-[600px] overflow-auto rounded-2xl">
      <div className="sticky top-0 z-10 bg-gs50 p-4">
        <h3 className="text-18SB">남은 할일</h3>
      </div>

      <div className="bg-gs00 px-6">
        {/* 오늘 할 일 */}
        <div>
          <h3 className="mb-1 text-18SB text-gs600">오늘</h3>
          {groupedTodos.today.length > 0 ? (
            groupedTodos.today.map((todo) => (
              <CheckTodo
                key={todo.todoId}
                id={todo.todoId}
                title={todo.title}
                done={todo.done}
                noteId={todo.noteId ?? null}
                onCheck={() => onToggle(todo.todoId)}
                goal={todo.goal}
              />
            ))
          ) : (
            <div className="flex items-center justify-center py-4 text-gs400">
              오늘의 할 일이 없습니다.
            </div>
          )}
        </div>

        {/* 예정된 할 일 */}
        <div className="mt-6">
          <div className="flex items-center justify-between">
            <h3 className="mb-4 text-18SB text-gs600">예정된 할일</h3>
            <FontAwesomeIcon
              className={cn(
                'size-4 text-gs500 transition-transform duration-300',
                isFutureFold ? 'rotate-180' : 'rotate-0',
              )}
              icon={faAngleDown}
              size="xl"
              onClick={() => setIsFutureFold((prev) => !prev)}
            />
          </div>
          <div className={isFutureFold ? 'hidden' : 'block max-h-96'}>
            {Object.keys(groupedTodos.upcoming).length > 0 ? (
              Object.entries(groupedTodos.upcoming)
                .sort(
                  ([a], [b]) => new Date(a).getTime() - new Date(b).getTime(),
                )
                .map(([date, todos]) => (
                  <div key={date} className="relative mb-4">
                    <div className="text-16M text-gs700">{date}</div>
                    {todos.map((todo) => (
                      <CheckTodo
                        key={todo.todoId}
                        id={todo.todoId}
                        title={todo.title}
                        done={todo.done}
                        noteId={todo.noteId ?? null}
                        onCheck={() => onToggle(todo.todoId)}
                        goal={todo.goal}
                      />
                    ))}
                  </div>
                ))
            ) : (
              <div className="flex items-center justify-center py-4 text-gs400">
                예정된 할 일이 없습니다.
              </div>
            )}
          </div>
        </div>

        {/* 지난 할 일 */}
        <div className="mt-14">
          <div className="flex items-center justify-between">
            <h3 className="mb-4 text-18SB text-gs600">지난 할일</h3>
            <FontAwesomeIcon
              className={cn(
                'size-4 text-gs500 transition-transform duration-300',
                isPastFold ? 'rotate-180' : 'rotate-0',
              )}
              icon={faAngleDown}
              size="xl"
              onClick={() => setIsPastFold((prev) => !prev)}
            />
          </div>
          <div className={isPastFold ? 'hidden' : 'block max-h-96'}>
            {Object.keys(groupedTodos.past).length > 0 ? (
              Object.entries(groupedTodos.past)
                .sort(
                  ([a], [b]) => new Date(a).getTime() - new Date(b).getTime(),
                )
                .map(([date, todos]) => (
                  <div key={date} className="relative mb-4">
                    <div className="text-16M text-gs700">{date}</div>
                    {todos.map((todo) => (
                      <CheckTodo
                        key={todo.todoId}
                        id={todo.todoId}
                        title={todo.title}
                        done={todo.done}
                        noteId={todo.noteId ?? null}
                        onCheck={() => onToggle(todo.todoId)}
                        goal={todo.goal}
                      />
                    ))}
                  </div>
                ))
            ) : (
              <div className="flex items-center justify-center py-4 text-gs400">
                지난 할 일이 없습니다.
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="sticky bottom-0 z-10 rounded-b-xl bg-gs00 p-5">
        <div
          className="flex cursor-pointer items-center justify-center rounded-xl border-2 border-slate500 p-1 text-14M text-slate500"
          onClick={() => setIsModalOpen(true)}
        >
          + 새 할일 생성
        </div>
      </div>

      {isModalOpen && (
        <GoalTodoModal onClose={() => setIsModalOpen(false)} goalId={goalId} />
      )}
    </div>
  );
}
