'use client';

import { faLayerGroup, faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import NoteModal from '@/components/note/NoteModal';
import ConfirmDeleteModal from '@/components/note/ConfirmDeleteModal';
import { useClickOutside } from '@/hooks/useClickOutside';

interface Note {
  id: number;
  title: string;
  todo: string;
  content: string;
  date: string;
}

interface NoteItemProps {
  note: Note;
  goalId: string;
}

export default function NoteItem({ note, goalId }: NoteItemProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [menuRef, isMenuOpen, setIsMenuOpen] = useClickOutside<HTMLDivElement>(
    () => setIsMenuOpen(false),
  );

  const handleDelete = () => {
    setIsDeleteModalOpen(false);
  };

  return (
    <>
      <div className="mb-3 h-40 w-[70%] rounded-xl border bg-gs00 p-4 shadow-md">
        {/* 상단 아이콘 */}
        <div className="flex items-center justify-between">
          <div className="flex size-7 items-center justify-center rounded-full bg-slate100 text-slate300">
            <FontAwesomeIcon icon={faLayerGroup} />
          </div>

          {/* 메뉴 아이콘 */}
          <div className="relative" ref={menuRef}>
            <FontAwesomeIcon
              icon={faEllipsisV}
              className="cursor-pointer text-gs500"
              onClick={() => setIsMenuOpen((prev) => !prev)}
            />
            {isMenuOpen && (
              <div className="absolute right-0 z-10 mt-2 w-24 rounded bg-gs00 shadow-md">
                <button
                  type="button"
                  className="block w-full border-b px-4 py-2 text-14R text-gs700 hover:bg-gs200"
                >
                  수정하기
                </button>
                <button
                  type="button"
                  className="block w-full px-4 py-2 text-14R text-gs700 hover:bg-gs200"
                  onClick={() => setIsDeleteModalOpen(true)}
                >
                  삭제하기
                </button>
              </div>
            )}
          </div>
        </div>

        {/* 제목 */}
        <button
          type="button"
          className="mt-2 w-full cursor-pointer border-b pb-[14px] text-left text-18M font-semibold hover:text-slate500"
          onClick={() => setIsModalOpen((prev) => !prev)}
        >
          {note.title}
        </button>

        {/* todo */}
        <div className="mb-2 mt-3 flex items-center gap-2 text-12M text-gs500">
          <span className="rounded-lg bg-gs200 p-1">To do</span>
          <span>{note.todo}</span>
        </div>
      </div>

      {/* 모달 */}
      <NoteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        note={note}
        goalId={goalId}
      />
      <ConfirmDeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onDelete={handleDelete}
      />
    </>
  );
}
