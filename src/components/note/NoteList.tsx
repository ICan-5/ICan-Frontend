'use client';

import { faLayerGroup, faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState, useRef, useEffect } from 'react';

type Note = {
  id: number;
  title: string;
  todo: string;
};

type NoteListProps = {
  notes: Note[];
};

export default function NoteList({ notes }: NoteListProps) {
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpenMenuId(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div>
      {notes.length === 0 && (
        <div className="w-4/5 py-8 text-center text-gs500">
          노트가 아직 없습니다.
        </div>
      )}
      {notes.map((note) => (
        <div
          key={note.id}
          className="mb-4 w-4/5 rounded-2xl border bg-gs00 p-4 shadow-md"
        >
          {/* 상단 아이콘 */}
          <div className="flex items-center justify-between">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-slate100 text-slate300">
              <FontAwesomeIcon icon={faLayerGroup} />
            </div>

            {/* 메뉴 아이콘 */}
            <div className="relative" ref={menuRef}>
              <FontAwesomeIcon
                icon={faEllipsisV}
                className="cursor-pointer text-gs500"
                onClick={() =>
                  setOpenMenuId(note.id === openMenuId ? null : note.id)
                }
              />
              {openMenuId === note.id && (
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
                  >
                    삭제하기
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* 제목 */}
          <h3 className="mt-2 border-b pb-3 text-18M font-semibold">
            {note.title}
          </h3>

          {/* todo */}
          <div className="mb-2 mt-3 flex items-center gap-2 text-14M text-gs500">
            <span className="rounded-lg bg-gs200 p-1">To do</span>
            <span>{note.todo}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
