import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEY } from '@/constants/queryKey';
import { getNoteDetail, getNotes, deleteNote } from '@/services/note';
import { NoteDetail } from '@/types/note';

export const useNoteDetail = (noteId?: number | null) => {
  return useQuery<NoteDetail>({
    queryKey: [QUERY_KEY.NOTE, noteId],
    queryFn: () => getNoteDetail(noteId!),
    enabled: !!noteId,
  });
};

export function useNoteList(goalId: number) {
  return useQuery({
    queryKey: [QUERY_KEY.GOAL_NOTES, goalId],
    queryFn: () => getNotes(goalId),
  });
}

export const useDeleteNote = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (noteId: number) => deleteNote(noteId),
    onSuccess: (noteId) => {
      const noteData = queryClient.getQueryData<NoteDetail>([
        QUERY_KEY.NOTE,
        noteId,
      ]);

      if (noteData) {
        const { date, goal } = noteData.todo;
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEY.DAILY_TODOS, date],
        });
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEY.GOAL_TODOS, goal?.goalId],
        });
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEY.GOAL_NOTES, goal?.goalId],
        });
      }
      queryClient.removeQueries({ queryKey: [QUERY_KEY.NOTE, noteId] });
    },
  });
};
