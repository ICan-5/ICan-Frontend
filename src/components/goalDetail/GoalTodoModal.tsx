'use client';

import { useState } from 'react';
import ReactDOM from 'react-dom';
import GoalTodoCreateModal from './GoalTodoCreateModal';
import ConfirmModal from '@/components/todoCalendar/ConfirmModal';

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
          onClose={() => {
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
