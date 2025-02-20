import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFlag } from '@fortawesome/free-solid-svg-icons';

type NoteModalProps = {
  isOpen: boolean;
  onClose: () => void;
  note: {
    id: number;
    title: string;
    todo: string;
    content: string;
  };
};

export default function NoteModal({ isOpen, onClose, note }: NoteModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-10 flex justify-end bg-gsBk/50">
      {/* 모달 컨테이너 */}
      <div className="h-full w-[40%] overflow-y-auto bg-white p-6 shadow-lg">
        {/* 닫기 버튼 */}
        <button
          type="button"
          className="mb-4 text-gs500 hover:text-black"
          onClick={onClose}
        >
          ✕
        </button>

        {/* 목표 제목 */}
        <div className="flex items-center justify-between">
          <h1 className="flex items-center text-18R font-semibold">
            <FontAwesomeIcon icon={faFlag} className="mr-2 text-slate500" />
            임시 목표 {note.id}
          </h1>
        </div>

        {/* To do */}
        <div className="my-2 flex items-center gap-2 text-gray-600">
          <span className="rounded bg-gs200 text-16M">To do</span>
          <span className="text-16M">{note.todo}</span>
        </div>

        {/* 노트 제목 */}
        <div className="flex items-center justify-between border-t pt-2">
          <h1 className="flex items-center text-16SB">{note.title}</h1>
        </div>

        {/* 내용 */}
        <div className="mt-3 border-t pt-2">
          <p className="text-gs600">{note.content}</p>
        </div>
      </div>
    </div>
  );
}
