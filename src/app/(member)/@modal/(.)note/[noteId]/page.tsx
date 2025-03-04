import { renderNoteDetail } from '@/utils/renderNotePage';

export default async function NoteDetailPage({
  params,
}: {
  params: { noteId: number };
}) {
  const noteId = Number(params.noteId);
  return renderNoteDetail(noteId);
}
