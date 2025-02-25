import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Goal } from '@/types/goals';

const fetchGoals = async () => {
  const res = await fetch('/api/goals');
  if (!res.ok) throw new Error('목표 리스트를 불러오는데 실패했습니다.');
  return res.json();
};

const addGoal = async (title: string) => {
  const res = await fetch(`/api/goals?title=${title}`, { method: 'POST' });
  if (!res.ok) throw new Error('목표 추가 실패');
  return res.json();
};

export const useGoals = () => {
  return useQuery({
    queryKey: ['goals'],
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
      queryClient.setQueryData(['goals'], (oldData: Goal[]) => {
        if (!oldData) return [newGoal];
        return [...oldData, newGoal];
      });
    },
  });
};
