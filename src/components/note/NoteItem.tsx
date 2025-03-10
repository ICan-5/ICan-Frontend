'use client';

import Link from 'next/link';

interface Note {
  id: number;
  title: string;
  todo: { title: string };
}

interface NoteItemProps {
  note: Note;
}

export default function NoteItem({ note }: NoteItemProps) {
  return (
    <div className="mb-4 rounded-xl border bg-gs00 p-6 shadow-md sm:max-h-[200px] md:max-h-[200px] lg:max-h-[120px]">
      {/* 제목 */}
      <Link
        href={`/note/${note.id}`}
        className="block w-full cursor-pointer border-b pb-3 text-left text-18M font-semibold hover:text-slate500"
      >
        {note.title}
      </Link>

      {/* todo */}
      <div className="mt-3 flex items-center gap-2 text-gs700">
        <span className="mr-2 rounded-[4px] bg-gs200 p-1 text-12SB">To do</span>
        <span className="mr-2 text-12R">{note.todo.title}</span>
      </div>
    </div>
  );
}
