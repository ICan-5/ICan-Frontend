import React from 'react';
import CheckTodo from '../common/todo/CheckTodo';
import { Todo } from '@/types/todos';

interface Props {
  list: Todo[];
  onToggle: (id: number) => void;
  onDelete?: (id: number) => void;
}

export default function GoalDoneList({ list, onToggle, onDelete }: Props) {
  const sortedList = [...list].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
  );

  return (
    <div className="relative h-[310px] overflow-auto rounded-2xl">
      <div className="sticky top-0 z-10 bg-gs50 p-4">
        <h3 className="text-18SB">완료된 할일</h3>
      </div>
      <div className="min-h-[300px] bg-gs00 px-6">
        {sortedList.length === 0 ? (
          <div className="flex items-center justify-center py-6 text-gs500">
            완료된 할일이 없습니다.
          </div>
        ) : (
          sortedList.map((done) => (
            <CheckTodo
              key={done.todoId}
              id={done.todoId}
              title={done.title}
              done={done.done}
              noteId={done.noteId}
              onCheck={() => onToggle(done.todoId)}
              onDelete={onDelete ? () => onDelete(done.todoId) : undefined}
              goal={done.goal}
            />
          ))
        )}
      </div>
    </div>
  );
}
