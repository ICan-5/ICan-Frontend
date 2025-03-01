import { useState } from 'react';
import ReactDOM from 'react-dom';
import GoalTodoCreateModal from './GoalTodoCreateModal';
import ConfirmModal from '@/components/common/ConfirmModal';

type Props = {
  goalId: string;
  onClose: () => void;
  onAdd: (task: string, date: string) => void;
};

export default function TodoModal({ goalId, onClose, onAdd }: Props) {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isCreateOpen, setIsCreateOpen] = useState(true);

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/50">
      {isCreateOpen && !isConfirmOpen && (
        <GoalTodoCreateModal
          goalId={goalId}
          onClose={() => {
            setIsCreateOpen(false);
            setIsConfirmOpen(true);
          }}
          onAdd={(task, date) => {
            onAdd(task, date);
            onClose();
          }}
        />
      )}

      {isConfirmOpen && (
        <ConfirmModal
          title="정말 취소하시겠습니까?"
          description="취소하면 모든 변경 사항이 사라집니다."
          confirmText="확인"
          onCancel={() => {
            setIsCreateOpen(true);
            setIsConfirmOpen(false);
          }}
          onConfirm={onClose}
        />
      )}
    </div>,
    document.body,
  );
}
