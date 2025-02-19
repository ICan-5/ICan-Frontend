import React from 'react';
import NoteItem from './NoteItem';

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
      {notes.length === 0 && (
        <div className="w-4/5 py-8 text-center text-gs500">
          아직 등록된 노트가 없어요.
        </div>
      )}
      {notes.map((note) => (
        <NoteItem key={note.id} note={note} />
      ))}
    </div>
  );
}
