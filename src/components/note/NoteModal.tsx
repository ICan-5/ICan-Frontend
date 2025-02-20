import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFlag, faXmark } from '@fortawesome/free-solid-svg-icons';

type NoteModalProps = {
  isOpen: boolean;
  onClose: () => void;
  note: {
    id: number;
    title: string;
    todo: string;
    content: string;
    date: string;
  };
  goalId: string;
};

export default function NoteModal({
  isOpen,
  onClose,
  note,
  goalId,
}: NoteModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-10 flex justify-end bg-gsBk/50">
      {/* 모달 컨테이너 */}
      <div className="h-full w-[40%] overflow-y-auto bg-white p-6 shadow-lg">
        {/* 닫기 버튼 */}
        <button
          type="button"
          className="mb-4 text-18R text-gs500 hover:text-black"
          onClick={onClose}
        >
          <FontAwesomeIcon icon={faXmark} />
        </button>

        {/* 목표 제목 */}
        <div className="flex items-center justify-between">
          <h1 className="flex items-center gap-3 text-18SB">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate100 text-slate500">
              <FontAwesomeIcon icon={faFlag} />
            </div>
            임시 목표 {goalId}
          </h1>
        </div>

        {/* To do */}
        <div className="my-2 flex items-center gap-2 text-gs600">
          <span className="rounded bg-gs200 text-16M">To do</span>
          <span className="text-16M">{note.todo}</span>
          <span className="ml-auto text-14R">{note.date}</span>
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
