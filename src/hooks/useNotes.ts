import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '@/constants/queryKey';
import { getNoteDetail } from '@/services/note';
import { NoteDetail } from '@/types/note';

export const useNoteDetail = (noteId: number, initialData: NoteDetail) => {
  return useQuery({
    queryKey: [QUERY_KEY.NOTE, noteId],
    queryFn: () => getNoteDetail(noteId),
    initialData,
  });
};
