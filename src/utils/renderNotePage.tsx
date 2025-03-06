import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import NoteModal from '@/components/note/NoteModal';
import { QUERY_KEY } from '@/constants/queryKey';
import { getServerNoteDetail } from '@/services/note';

export async function renderNoteDetail(noteId: number) {
  const queryClient = new QueryClient();
  try {
    await queryClient.prefetchQuery({
      queryKey: [QUERY_KEY.NOTE, noteId],
      queryFn: () => getServerNoteDetail(noteId),
    });

    // 캐시된 상태를 클라이언트에게 전달
    const dehydratedState = dehydrate(queryClient);

    return (
      <HydrationBoundary state={dehydratedState}>
        <NoteModal noteId={noteId} />
      </HydrationBoundary>
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
