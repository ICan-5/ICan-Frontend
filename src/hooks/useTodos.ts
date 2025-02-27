import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getErrorMessage } from '@/constants/errorMessages';
import { QUERY_KEY } from '@/constants/queryKey';
import { Todo } from '@/types/todos';
import { TodoFormValues } from '@/components/todoCalendar/CreateTodo';

const fetchMonthlyTodos = async (year: number, month: number) => {
  const formattedMonth = String(month).padStart(2, '0');
  const res = await fetch(
    `api/todos/monthly?year=${year}&month=${formattedMonth}`,
  );
  if (!res.ok) throw new Error(getErrorMessage(res.status));
  return res.json();
};

const fetchDaliyTodos = async (date: string) => {
  const res = await fetch(`api/todos/daily?date=${date}`);
  if (!res.ok) throw new Error(getErrorMessage(res.status));
  return res.json();
};

const addTodo = async (formData: TodoFormValues) => {
  try {
    const response = await fetch('/api/todos', {
      method: 'POST',
      body: JSON.stringify({
        title: formData.title,
        goalId: formData.goal?.goalId,
        date: formData.date?.toISOString().split('T')[0] || null,
      }),
    });

    if (!response.ok) throw new Error(getErrorMessage(response.status));
    const data = await response.json();
    return data;
  } catch (error) {
    console.log('할 일 생성 중 오류 발생', error);
    throw error;
  }
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

export const useDailyTodos = (date: string) => {
  return useQuery<Todo[]>({
    queryKey: [QUERY_KEY.DAILY_TODOS, date],
    queryFn: () => fetchDaliyTodos(date),
    initialData: [],
    retry: false,
    throwOnError: false,
  });
};

export const useAddTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (formData: TodoFormValues) => addTodo(formData),
    onSuccess: (newTodo) => {
      const { date } = newTodo;
      const year = new Date(date).getFullYear();
      const month = new Date(date).getMonth() + 1;

      queryClient.setQueryData(
        [QUERY_KEY.DAILY_TODOS, date],
        (oldData: Todo[]) => {
          if (!oldData) return [newTodo];
          return [...oldData, newTodo];
        },
      );

      // 한 달 단위의 캐시는 무효화 -> 최신 데이터 유지
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.MONTHLY_TODOS, { year, month }],
      });
    },
  });
};
