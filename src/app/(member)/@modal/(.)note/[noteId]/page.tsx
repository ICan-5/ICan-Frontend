import NoteModal from '@/components/note/NoteModal';
import { getNoteDetail } from '@/services/note';

export default async function PhotoModal({
  params,
}: {
  params: { noteId: string };
}) {
  const noteId = Number(params.noteId);

  const note = await getNoteDetail(noteId);
  return (
    note && (
      <NoteModal
        goalTitle={note.goalTitle}
        todoTitle={note.todoTitle}
        title={note.title}
        content={note.content}
        updatedAt={note.updatedAt}
      />
    )
  );
}
