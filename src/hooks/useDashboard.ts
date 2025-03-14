import { useQuery } from '@tanstack/react-query';
import { getTodoGrass } from '@/services/dashboard';
import { QUERY_KEY } from '@/constants/queryKey';
import { Grass } from '@/types/dashboard';
import { Todo } from '@/types/todos';

const fetchTodoGrass = async () => {
  return getTodoGrass();
};

export const useProgress = (date: string, placeholderData: number) => {
  return useQuery({
    queryKey: [QUERY_KEY.DAILY_TODOS, date],
    select: (data: Todo[] | number) => {
      if (typeof data === 'number') return data;
      const doneCount = data.filter((todo) => todo.done).length; // done이 true인 항목의 개수
      const totalCount = data.length; // 전체 데이터 개수
      return Math.floor((doneCount / totalCount) * 100) / 100 || 0;
    },
    placeholderData,
  });
};

export const useGrass = (initialData: Grass[]) => {
  return useQuery({
    queryKey: [QUERY_KEY.GRASS],
    queryFn: fetchTodoGrass,
    initialData,
    retry: 3,
    staleTime: 5 * 60 * 1000,
  });
};
