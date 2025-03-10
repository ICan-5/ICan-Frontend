'use client';

import { useNoteList } from '@/hooks/useNotes';
import NoteHeader from '@/components/note/NoteHeader';
import NoteList from '@/components/note/NoteList';

export default function Page({ params }: { params: { id: string } }) {
  const goalId = Number(params.id);
  const { data: notes, isLoading, error } = useNoteList(goalId);

  if (isLoading) return <p className="text-center">Loading...</p>;
  if (error)
    return <p className="text-center text-red-500">Failed to load notes</p>;

  return (
    <div className="relative left-1/2 w-full max-w-screen-xl -translate-x-1/2 bg-gs100">
      <div className="mb-8 flex h-[68px] items-center rounded-xl bg-gs00 shadow">
        <NoteHeader id={params.id} />
      </div>
      <div>
        <NoteList notes={notes ?? []} />
      </div>
    </div>
  );
}
