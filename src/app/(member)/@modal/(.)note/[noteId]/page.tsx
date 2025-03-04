import { renderNoteDetail } from '@/utils/renderNotePage';

export default async function NoteDetailModal({
  params,
}: {
  params: { noteId: string };
}) {
  const noteId = Number(params.noteId);
  return renderNoteDetail(noteId);
}
