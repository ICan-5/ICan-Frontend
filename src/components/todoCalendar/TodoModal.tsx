import { useState } from 'react';
import { createPortal } from 'react-dom';
import CreateTodo, { TodoFormValues } from './CreateTodo';
import { Todo } from '@/types/todos';
import ConfirmModal from '../common/ConfirmModal';

interface Props {
  selectedDate: Date;
  onCloseModal: () => void;
  todoToEdit?: Todo | null;
}

function TodoModal({ selectedDate, onCloseModal, todoToEdit }: Props) {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [savedValues, setSavedValues] = useState<TodoFormValues | null>(
    todoToEdit
      ? {
          title: todoToEdit.title,
          goal: todoToEdit.goal,
          date: new Date(todoToEdit.date),
        }
      : null,
  );
  const todoId = todoToEdit?.todoId || null;

  const handleOpenConfirmModal = (currentValues: TodoFormValues) => {
    setSavedValues(currentValues);
    setShowConfirmModal(true);
  };
  const handleCloseConfirmModal = () => setShowConfirmModal(false);

  return createPortal(
    <div>
      <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/50">
        {!showConfirmModal && (
          <CreateTodo
            selectedDate={selectedDate}
            onCloseModal={onCloseModal}
            onShowConfirmModal={handleOpenConfirmModal}
            savedValues={savedValues}
            isEdit={!!todoToEdit}
            todoId={todoId}
          />
        )}
        {showConfirmModal && (
          <ConfirmModal
            title="정말 나가시겠어요?"
            description="작성한 내용이 모두 사라집니다."
            confirmText="나가기"
            onCancel={handleCloseConfirmModal}
            onConfirm={onCloseModal}
          />
        )}
      </div>
    </div>,
    document.body,
  );
}

export default TodoModal;
