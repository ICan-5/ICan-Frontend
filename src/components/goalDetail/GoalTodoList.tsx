'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import React, { useState } from 'react';
import cn from '@/utils/cn';
import CheckTodo from '@/components/common/todo/CheckTodo';
import GoalTodoModal from './GoalTodoModal';
import { Goal } from '@/types/goals';

interface Todo {
  id: number;
  task: string;
  date: string;
  done: boolean;
  noteId?: number | null;
  goal: Goal | null;
}

interface Props {
  list: Todo[];
  onToggle: (id: number) => void;
  onAdd: (task: string, date: string) => void;
  onDelete?: (id: number) => void;
  goalId: string;
}

interface GroupedTodos {
  past: Record<string, Todo[]>;
  today: Todo[];
  upcoming: Record<string, Todo[]>;
}

export default function GoalTodoList({
  list,
  onToggle,
  onAdd,
  onDelete,
  goalId,
}: Props) {
  const groupedTodos: GroupedTodos = { past: {}, today: [], upcoming: {} };
  const today = new Date().toISOString().split('T')[0];
  const [isFutureFold, setIsFutureFold] = useState(true);
  const [isPastFold, setIsPastFold] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 할 일 분류
  list.forEach(({ id, task, date, done, noteId, goal }) => {
    if (date < today) {
      groupedTodos.past[date] = groupedTodos.past[date] || [];
      groupedTodos.past[date].push({ id, task, done, date, noteId, goal });
    } else if (date === today) {
      groupedTodos.today.push({ id, task, done, date, noteId, goal });
    } else {
      groupedTodos.upcoming[date] = groupedTodos.upcoming[date] || [];
      groupedTodos.upcoming[date].push({ id, task, done, date, noteId, goal });
    }
  });

  // 모든 할 일이 없을 때
  const isEmpty =
    groupedTodos.today.length === 0 &&
    Object.keys(groupedTodos.upcoming).length === 0 &&
    Object.keys(groupedTodos.past).length === 0;

  return (
    <div className="flex flex-1 flex-col gap-6 md:flex-row md:items-start">
      <div className="w-full rounded-2xl bg-gs00 px-6 py-4 shadow">
        {/* 헤더 */}
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-18R font-bold">To do</h3>
          <div
            className="cursor-pointer text-slate400"
            onClick={() => setIsModalOpen(true)}
          >
            + 할 일 추가
          </div>
        </div>

        {/* 할 일이 없는 경우 */}
        {isEmpty ? (
          <div className="flex h-32 items-center justify-center text-gs500">
            해야할 일이 아직 없어요
          </div>
        ) : (
          <>
            {/* 오늘 할 일 */}
            {groupedTodos.today.length > 0 && (
              <div>
                <h3 className="mb-3 text-18R font-bold">오늘 할 일</h3>
                {groupedTodos.today.map((todo) => (
                  <CheckTodo
                    key={todo.id}
                    id={todo.id}
                    title={todo.task}
                    done={todo.done}
                    noteId={todo.noteId ?? null}
                    onCheck={() => onToggle(todo.id)}
                    onDelete={onDelete ? () => onDelete(todo.id) : undefined}
                    goal={todo.goal} // goal을 CheckTodo에 전달
                  />
                ))}
              </div>
            )}

            {/* 예정된 할 일 */}
            {Object.keys(groupedTodos.upcoming).length > 0 && (
              <div className="mt-2">
                <div className="flex items-center justify-between">
                  <h3 className="mb-3 text-18R font-bold">예정된 할 일</h3>
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
                  {Object.entries(groupedTodos.upcoming)
                    .sort(
                      ([aDate], [bDate]) =>
                        new Date(aDate).getTime() - new Date(bDate).getTime(),
                    )
                    .map(([date, todos]) => (
                      <div key={date} className="relative mb-4">
                        <div className="text-16M text-gs700">{date}</div>
                        {todos.map((todo) => (
                          <CheckTodo
                            key={todo.id}
                            id={todo.id}
                            title={todo.task}
                            done={todo.done}
                            noteId={todo.noteId ?? null}
                            onCheck={() => onToggle(todo.id)}
                            onDelete={
                              onDelete ? () => onDelete(todo.id) : undefined
                            }
                            goal={todo.goal}
                          />
                        ))}
                      </div>
                    ))}
                </div>
              </div>
            )}

            {/* 지난 할 일 */}
            {Object.keys(groupedTodos.past).length > 0 && (
              <div className="mt-2">
                <div className="flex items-center justify-between">
                  <h3 className="mb-3 text-18R font-bold">지난 할 일</h3>
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
                  {Object.entries(groupedTodos.past)
                    .sort(
                      ([aDate], [bDate]) =>
                        new Date(aDate).getTime() - new Date(bDate).getTime(),
                    )
                    .map(([date, todos]) => (
                      <div key={date} className="relative mb-4">
                        <div className="text-16M text-gs700">{date}</div>
                        {todos.map((todo) => (
                          <CheckTodo
                            key={todo.id}
                            id={todo.id}
                            title={todo.task}
                            done={todo.done}
                            noteId={todo.noteId ?? null}
                            onCheck={() => onToggle(todo.id)}
                            onDelete={
                              onDelete ? () => onDelete(todo.id) : undefined
                            }
                            goal={todo.goal}
                          />
                        ))}
                      </div>
                    ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>

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
