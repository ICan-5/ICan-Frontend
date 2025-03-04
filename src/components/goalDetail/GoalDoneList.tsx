import React, { useState } from 'react';
import CheckTodo from '../common/todo/CheckTodo';
import GoalTodoModal from './GoalTodoModal';
import { Todo } from '@/types/todos';

interface Props {
  list: Todo[];
  onToggle: (id: number) => void;
  onDelete?: (id: number) => void;
  goalId: string;
}

export default function GoalDoneList({
  list,
  onToggle,
  onDelete,
  goalId,
}: Props) {
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  // 오래된 날짜 순으로 정렬
  const sortedList = [...list].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
  );

  const handleEditTodo = (done: Todo) => {
    setEditingTodo(done);
    setIsModalOpen(true);
  };

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
            key={done.todoId}
            id={done.todoId}
            title={done.title}
            done={done.done}
            noteId={done.noteId}
            onCheck={() => onToggle(done.todoId)}
            onEdit={() => handleEditTodo(done)}
            onDelete={onDelete ? () => onDelete(done.todoId) : undefined}
            goal={done.goal}
          />
        ))
      )}
      {isModalOpen && (
        <GoalTodoModal
          onClose={() => setIsModalOpen(false)}
          goalId={goalId}
          todoId={editingTodo ? editingTodo.todoId : undefined}
        />
      )}
    </div>
  );
}
