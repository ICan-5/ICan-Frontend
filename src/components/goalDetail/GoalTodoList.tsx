'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
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
  const router = useRouter();
  const [isFutureFold, setIsFutureFold] = useState(true);
  const [isPastFold, setIsPastFold] = useState(true);
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

  const handleClickNote = (todo: Todo) => {
    if (todo.noteId) {
      router.push(`/note/${todo.noteId}`);
    } else {
      router.push(`/${todo.todoId}/note/create`);
    }
  };

  const isEmpty =
    groupedTodos.today.length === 0 &&
    Object.keys(groupedTodos.upcoming).length === 0 &&
    Object.keys(groupedTodos.past).length === 0;

  return (
    <div className="flex flex-1 flex-col gap-6 md:flex-row md:items-start">
      <div className="w-full rounded-2xl bg-gs00 px-6 py-4 shadow">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-18R font-bold">To do</h3>
          <div
            className="cursor-pointer text-slate400"
            onClick={() => setIsModalOpen(true)}
          >
            + 할 일 추가
          </div>
        </div>

        {isEmpty ? (
          <div className="flex h-32 items-center justify-center text-gs500">
            등록된 할 일이 없습니다.
          </div>
        ) : (
          <>
            {/* 오늘 할 일 */}
            {groupedTodos.today.length > 0 && (
              <div>
                <h3 className="mb-3 text-18R font-bold">오늘 할 일</h3>
                {groupedTodos.today.map((todo) => (
                  <CheckTodo
                    key={todo.todoId}
                    id={todo.todoId}
                    title={todo.title}
                    done={todo.done}
                    noteId={todo.noteId ?? null}
                    onCheck={() => onToggle(todo.todoId)}
                    goal={todo.goal}
                    onClickNote={() => handleClickNote(todo)}
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
                            key={todo.todoId}
                            id={todo.todoId}
                            title={todo.title}
                            done={todo.done}
                            noteId={todo.noteId ?? null}
                            onCheck={() => onToggle(todo.todoId)}
                            goal={todo.goal}
                            onClickNote={() => handleClickNote(todo)}
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
                            key={todo.todoId}
                            id={todo.todoId}
                            title={todo.title}
                            done={todo.done}
                            noteId={todo.noteId ?? null}
                            onCheck={() => onToggle(todo.todoId)}
                            goal={todo.goal}
                            onClickNote={() => handleClickNote(todo)}
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
        <GoalTodoModal onClose={() => setIsModalOpen(false)} goalId={goalId} />
      )}
    </div>
  );
}
