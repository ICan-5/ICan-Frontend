import NoteModal from '@/components/note/NoteModal';
import { getServerNoteDetail } from '@/services/note';

export async function renderNoteDetail(noteId: number) {
  try {
    const note = await getServerNoteDetail(noteId);

    if (!note) {
      return (
        <div className="flex h-full items-center justify-center">
          <p className="text-gs60 text-16M">
            노트를 불러오는 중 오류가 발생했습니다.
          </p>
        </div>
      );
    }

    return <NoteModal noteId={noteId} initialNote={note} />;
  } catch {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-gs60 text-16M">
          노트를 불러오는 중 오류가 발생했습니다.
        </p>
      </div>
    );
  }
}
