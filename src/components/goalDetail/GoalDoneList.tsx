import React from 'react';
import CheckTodo from '../common/todo/CheckTodo';
import { Goal } from '@/types/goals';

// Done 타입 정의
interface DoneProps {
  id: number;
  title: string;
  date: string;
  done: boolean;
  noteId: number | null;
  goal: Goal | null;
}

interface Props {
  list: DoneProps[];
  onToggle: (id: number) => void;
  onDelete?: (id: number) => void;
}

export default function GoalDoneList({ list, onToggle, onDelete }: Props) {
  // 오래된 날짜 순으로 정렬
  const sortedList = [...list].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
  );

  return (
    <div className="rounded-2xl bg-gs200 p-6 shadow">
      <h3 className="mb-4 text-18R font-bold">Done</h3>

      {sortedList.length === 0 ? (
        <div className="flex items-center justify-center py-6 text-gs500">
          못끝낸 할일이 없습니다.
        </div>
      ) : (
        sortedList.map((done) => (
          <CheckTodo
            key={done.id}
            id={done.id}
            title={done.title}
            done={done.done}
            noteId={done.noteId}
            onCheck={() => onToggle(done.id)}
            onDelete={onDelete ? () => onDelete(done.id) : undefined}
            goal={done.goal}
          />
        ))
      )}
    </div>
  );
}
