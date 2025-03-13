import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import CheckTodo from '../common/todo/CheckTodo';
import GoalTodoModal from './GoalTodoModal';
import { Todo } from '@/types/todos';
import { useDeleteGoalTodo } from '@/hooks/useGoalsTodo';
import ConfirmModal from '../common/ConfirmModal';

interface Props {
  list: Todo[];
  onToggle: (id: number) => void;
  goalId: string;
}

export default function GoalDoneList({ list, onToggle, goalId }: Props) {
  const router = useRouter();
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { mutate: deleteGoalTodo } = useDeleteGoalTodo(Number(goalId));
  const [selectedDeleteTodo, setSelectedDeleteTodo] = useState<Todo | null>(
    null,
  );
  // 오래된 날짜 순으로 정렬
  const sortedList = [...list].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
  );

  const handleEditTodo = (done: Todo) => {
    setEditingTodo(done);
    setIsModalOpen(true);
  };
  const handleDeleteTodo = (todo: Todo) => {
    setSelectedDeleteTodo(todo);
  };

  const handleConfirmDelete = () => {
    if (selectedDeleteTodo) {
      deleteGoalTodo(selectedDeleteTodo.todoId, {
        onSuccess: () => {
          setSelectedDeleteTodo(null);
        },
      });
    }
  };
  const handleClickNote = (todo: Todo) => {
    if (todo.noteId) {
      router.push(`/note/${todo.noteId}`);
    } else {
      router.push(`/${todo.todoId}/note/create`);
    }
  };

  return (
    <div className="relative flex h-[310px] flex-col rounded-xl bg-gs00 shadow">
      <div className="sticky top-0 z-10 flex-none rounded-xl bg-gs50 p-4">
        <h3 className="text-18SB">완료된 할일</h3>
      </div>
      <div className="flex-1 overflow-y-auto px-6">
        {sortedList.length === 0 ? (
          <div className="flex h-full items-center justify-center text-gs500">
            완료된 할일이 없습니다.
          </div>
        ) : (
          <div>
            {sortedList.map((done) => (
              <CheckTodo
                key={done.todoId}
                id={done.todoId}
                title={done.title}
                done={done.done}
                noteId={done.noteId}
                onCheck={() => onToggle(done.todoId)}
                onEdit={() => handleEditTodo(done)}
                onDelete={() => handleDeleteTodo(done)}
                onClickNote={() => handleClickNote(done)}
                goal={done.goal}
              />
            ))}
          </div>
        )}
      </div>

      {/* 삭제 확인 모달 */}
      {selectedDeleteTodo && (
        <ConfirmModal
          title="할일을 삭제 하시겠어요?"
          description="작성된 내용이 모두 사라지고 복구할 수 없습니다."
          confirmText="지우기"
          onCancel={() => setSelectedDeleteTodo(null)}
          onConfirm={handleConfirmDelete}
        />
      )}

      {/* 수정 모달 */}
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
