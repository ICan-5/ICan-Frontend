import { renderNoteDetail } from '@/utils/renderNotePage';

export default async function NoteDetailPage({
  params,
}: {
  params: { noteId: string };
}) {
  const noteId = Number(params.noteId);
  return renderNoteDetail(noteId);
}
