import { faLayerGroup } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

type Note = {
  id: number;
  title: string;
  todo: string;
};

type NoteListProps = {
  notes: Note[];
};

export default function NoteList({ notes }: NoteListProps) {
  return (
    <div>
      {notes.map((note) => (
        <div
          key={note.id}
          className="mb-4 flex w-4/5 flex-col gap-2 rounded-2xl border bg-gs00 p-4 shadow-md"
        >
          {/* 아이콘 */}
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-slate100 text-slate300">
            <FontAwesomeIcon icon={faLayerGroup} />
          </div>

          {/* 제목 */}
          <h3 className="border-b pb-3 text-18M font-semibold">{note.title}</h3>

          {/* todo */}
          <div className="mb-4 mt-3 flex items-center gap-2 text-14M text-gs500">
            <span className="rounded-lg bg-gs200 p-1">To do</span>
            <span>{note.todo}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
