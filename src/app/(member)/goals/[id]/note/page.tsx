'use client';

import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { useNoteList } from '@/hooks/useNotes';
import NoteHeader from '@/components/note/NoteHeader';
import NoteList from '@/components/note/NoteList';

config.autoAddCss = false;
export default function Page({ params }: { params: { id: string } }) {
  const goalId = Number(params.id);
  const { data: notes, isLoading, error } = useNoteList(goalId);

  const renderLoading = () => (
    <div className="absolute inset-0 flex items-center justify-center">
      <FontAwesomeIcon
        icon={faSpinner}
        spin
        className="text-4xl text-slate500"
      />
      <span className="ml-2 text-lg text-slate-400">로딩 중...</span>
    </div>
  );

  if (isLoading)
    return <div className="relative min-h-screen">{renderLoading()}</div>;
  if (error)
    return <p className="text-center text-red-500">Failed to load notes</p>;

  return (
    <div className="relative left-1/2 w-full max-w-screen-xl -translate-x-1/2 bg-gs100">
      <div className="mb-8 flex min-h-[68px] items-center rounded-xl bg-gs00 shadow">
        <NoteHeader id={params.id} />
      </div>
      <div>
        <NoteList notes={notes ?? []} />
      </div>
    </div>
  );
}
