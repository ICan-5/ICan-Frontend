import { useState } from 'react';
import { createPortal } from 'react-dom';
import CreateTodo, { TodoFormValues } from './CreateTodo';
import ConfirmModal from './ConfirmModal';
import { Todo } from '@/types/todos';

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
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/50">
      {!showConfirmModal && (
        <div className="flex w-[520px] flex-col gap-6 rounded-lg bg-gs00 p-6">
          <h2 className="text-18SB">
            {todoToEdit ? '할 일 수정' : '할 일 생성'}
          </h2>
          <CreateTodo
            selectedDate={selectedDate}
            onCloseModal={onCloseModal}
            onShowConfirmModal={handleOpenConfirmModal}
            savedValues={savedValues}
            isEdit={!!todoToEdit}
            todoId={todoId}
          />
        </div>
      )}
      {showConfirmModal && (
        <ConfirmModal
          onClose={handleCloseConfirmModal}
          onConfirm={onCloseModal}
        />
      )}
    </div>,
    document.body,
  );
}

export default TodoModal;
