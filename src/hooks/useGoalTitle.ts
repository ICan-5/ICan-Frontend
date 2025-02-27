import { useQuery } from '@tanstack/react-query';

export function useGoalTitle(goalId: string) {
  return useQuery({
    queryKey: ['goalTitle', goalId],
    queryFn: async () => {
      if (!goalId) throw new Error('Invalid goalId');

      const response = await fetch(`/api/goals/${goalId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch goal data');
      }
      const data = await response.json();
      return data.goalTitle || '목표';
    },
  });
}
