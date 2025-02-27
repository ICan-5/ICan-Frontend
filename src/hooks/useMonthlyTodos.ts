import { useQuery } from '@tanstack/react-query';
import { getErrorMessage } from '@/constants/errorMessages';
import { QUERY_KEY } from '@/constants/queryKey';
import { Todo } from '@/types/todos';

const fetchMonthlyTodos = async (year: number, month: number) => {
  const formattedMonth = String(month).padStart(2, '0');
  const res = await fetch(`api/todos?year=${year}&month=${formattedMonth}`);
  if (!res.ok) throw new Error(getErrorMessage(res.status));
  return res.json();
};

export const useMonthlyTodos = (year: number, month: number) => {
  return useQuery<Todo[]>({
    queryKey: [QUERY_KEY.MONTHLY_TODOS, { year, month }],
    queryFn: () => fetchMonthlyTodos(year, month),
    initialData: [],
    retry: false,
    throwOnError: false,
  });
};
