import NoteModal from '@/components/note/NoteModal';

export default async function PhotoModal({
  params,
}: {
  params: { noteId: string };
}) {
  const { noteId } = params;
  console.log(noteId);
  const note = {
    goalTitle: '임시 목표',
    todoTitle: '임시 할 일',
    title: '임시 제목',
    content: '임시 내용',
    updatedAt: '2025-02-28T08:31:12.542Z',
  };

  <NoteModal
    goalTitle={note.goalTitle}
    todoTitle={note.todoTitle}
    title={note.title}
    content={note.content}
    updatedAt={note.updatedAt}
  />;
}
