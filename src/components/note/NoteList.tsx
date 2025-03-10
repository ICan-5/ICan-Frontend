import React from 'react';
import NoteItem from '@/components/note/NoteItem';

interface Props {
  id: number;
  title: string;
  todo: { title: string };
}

interface NoteListProps {
  notes: Props[];
}

export default function NoteList({ notes }: NoteListProps) {
  return (
    <div>
      {notes.length === 0 && (
        <div className="text-center text-gs500">아직 등록된 노트가 없어요.</div>
      )}
      {notes.map((note) => (
        <NoteItem key={note.id} note={note} />
      ))}
    </div>
  );
}
