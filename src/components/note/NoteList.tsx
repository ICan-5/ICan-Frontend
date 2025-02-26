import React from 'react';
import NoteItem from '@/components/note/NoteItem';

interface Note {
  id: number;
  title: string;
  todo: string;
  content: string;
  date: string;
}

interface NoteListProps {
  notes: Note[];
  goalId: string;
}

export default function NoteList({ notes, goalId }: NoteListProps) {
  return (
    <div>
      {notes.length === 0 && (
        <div className="max-w-screen-[1200px] w-full py-8 text-center text-gs500">
          아직 등록된 노트가 없어요.
        </div>
      )}
      {notes.map((note) => (
        <NoteItem key={note.id} note={note} goalId={goalId} />
      ))}
    </div>
  );
}
