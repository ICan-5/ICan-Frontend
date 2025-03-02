'use client';

import { useState } from 'react';
import ReactDOM from 'react-dom';
import GoalTodoCreateModal from './GoalTodoCreateModal';
import ConfirmModal from '@/components/common/ConfirmModal';

type Props = {
  goalId: string;
  onClose: () => void;
};

export default function GoalTodoModal({ goalId, onClose }: Props) {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isCreateOpen, setIsCreateOpen] = useState(true);

  const handleCancelCreate = () => {
    setIsConfirmOpen(true);
  };

  const handleFinalClose = () => {
    setIsCreateOpen(false);
    onClose();
  };

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/50">
      {/* 할 일 생성 모달 */}
      {isCreateOpen && (
        <GoalTodoCreateModal
          goalId={goalId}
          onClose={handleFinalClose}
          onCancel={handleCancelCreate}
          isVisible={!isConfirmOpen}
        />
      )}

      {/* 확인 모달 */}
      {isConfirmOpen && (
        <ConfirmModal
          title="정말 취소하시겠습니까?"
          description="취소하면 모든 변경 사항이 사라집니다."
          confirmText="확인"
          onCancel={() => {
            setIsConfirmOpen(false);
          }}
          onConfirm={handleFinalClose}
        />
      )}
    </div>,
    document.body,
  );
}
