import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Goal } from '@/types/goals';
import { QUERY_KEY } from '@/constants/queryKey';
import { getErrorMessage } from '@/constants/errorMessages';

const fetchGoals = async () => {
  const res = await fetch('/api/goals');
  if (!res.ok) throw new Error(getErrorMessage(res.status));
  return res.json();
};

const addGoal = async (title: string) => {
  const res = await fetch(`/api/goals?title=${title}`, { method: 'POST' });
  if (!res.ok) throw new Error(getErrorMessage(res.status));
  return res.json();
};

export const useGoals = () => {
  return useQuery({
    queryKey: [QUERY_KEY.GOALS],
    queryFn: fetchGoals,
    initialData: [],
    retry: false,
    throwOnError: false,
  });
};

export const useAddGoal = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (title: string) => addGoal(title),
    onSuccess: (newGoal: Goal) => {
      queryClient.setQueryData([QUERY_KEY.GOALS], (oldData: Goal[]) => {
        if (!oldData) return [newGoal];
        return [...oldData, newGoal];
      });
    },
  });
};
