import NoteModal from '@/components/note/NoteModal';
import { getNoteDetail } from '@/services/note';

export async function renderNoteDetail(noteId: number) {
  try {
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
