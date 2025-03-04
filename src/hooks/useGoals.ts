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

// 목표 수정하기
const updateGoal = async (goalId: number, updatedFields: Partial<Goal>) => {
  const res = await fetch(`/api/goals/${goalId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedFields),
  });

  if (!res.ok) throw new Error(getErrorMessage(res.status));
  return res.json();
};

// 목표 삭제하기
const deleteGoal = async (goalId: number) => {
  const res = await fetch(`/api/goals/${goalId}`, {
    method: 'DELETE',
  });

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

// 목표 수정 훅
export const useUpdateGoal = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: { goalId: number; updatedFields: Partial<Goal> }) =>
      updateGoal(params.goalId, params.updatedFields),
    onSuccess: (updatedGoal: Goal, variables) => {
      queryClient.setQueryData([QUERY_KEY.GOALS], (oldData: Goal[]) => {
        if (!oldData) return [updatedGoal];
        return oldData.map((goal) =>
          goal.goalId === variables.goalId ? updatedGoal : goal,
        );
      });
    },
  });
};

// 목표 삭제 훅
export const useDeleteGoal = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (goalId: number) => deleteGoal(goalId),
    onMutate: async (goalId: number) => {
      await queryClient.cancelQueries({ queryKey: [QUERY_KEY.GOALS] });

      const previousGoals = queryClient.getQueryData<Goal[]>([QUERY_KEY.GOALS]);

      if (previousGoals) {
        queryClient.setQueryData(
          [QUERY_KEY.GOALS],
          previousGoals.filter((goal) => goal.goalId !== goalId),
        );
      }

      return { previousGoals };
    },
    onError: (_error, _goalId, context) => {
      if (context?.previousGoals) {
        queryClient.setQueryData([QUERY_KEY.GOALS], context.previousGoals);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.GOALS] });
    },
  });
};
