import { useQuery } from '@tanstack/react-query';
import { getTodoGrass } from '@/services/dashboard';
import { QUERY_KEY } from '@/constants/queryKey';
import { Grass } from '@/types/dashboard';

const fetchTodoGrass = async () => {
  return getTodoGrass();
};

export const useGrass = (initialData: Grass[]) => {
  return useQuery({
    queryKey: [QUERY_KEY.GRASS],
    queryFn: fetchTodoGrass,
    initialData,
  });
};
