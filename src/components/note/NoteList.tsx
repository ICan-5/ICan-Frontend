import React from 'react';
import NoteItem from '@/components/note/NoteItem';

type Note = {
  id: number;
  title: string;
  todo: string;
  content: string;
  date: string;
};

type NoteListProps = {
  notes: Note[];
  goalId: string;
};

export default function NoteList({ notes, goalId }: NoteListProps) {
  return (
    <div>
      {notes.length === 0 && (
        <div className="w-4/5 py-8 text-center text-gs500">
          아직 등록된 노트가 없어요.
        </div>
      )}
      {notes.map((note) => (
        <NoteItem key={note.id} note={note} goalId={goalId} />
      ))}
    </div>
  );
}
