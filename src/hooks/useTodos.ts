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

const fetchDailyTodos = async (date: string) => {
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
        date: formData.date.toLocaleDateString('sv-SE'),
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

const updateTodo = async (todoId: number, updatedFields: Partial<Todo>) => {
  try {
    const body = {
      ...updatedFields,
      goalId: updatedFields.goal?.goalId || null,
    };
    const response = await fetch(`/api/todos/${todoId}`, {
      method: 'PATCH',
      body: JSON.stringify(body),
    });

    if (!response.ok) throw new Error(getErrorMessage(response.status));
    const data = await response.json();
    return data;
  } catch (error) {
    console.log('할 일 수정 중 오류 발생', error);
    throw error;
  }
};

const deleteTodo = async (todoId: number) => {
  try {
    const response = await fetch(`/api/todos/${todoId}`, {
      method: 'DELETE',
    });

    if (!response.ok) throw new Error(getErrorMessage(response.status));

    return { todoId };
  } catch (error) {
    console.error('할 일 삭제 중 오류 발생:', error);
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
    queryFn: () => fetchDailyTodos(date),
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

export const useUpdateTodo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: { todoId: number; updatedFields: Partial<Todo> }) =>
      updateTodo(data.todoId, data.updatedFields),
    onSuccess: (updatedTodo) => {
      // const { todoId } = variables;
      const { date: newDate, todoId } = updatedTodo;
      const year = new Date(newDate).getFullYear();
      const month = new Date(newDate).getMonth() + 1;

      let previousDate: string | null = null;
      queryClient
        .getQueryCache()
        .findAll({
          queryKey: [QUERY_KEY.DAILY_TODOS],
        })
        .forEach((query) => {
          const todos = query.state.data as Todo[];
          const foundTodo = todos?.find((todo) => todo.todoId === todoId);
          if (foundTodo) {
            previousDate = foundTodo.date;
          }
        });

      // 날짜 변경 시 이전 날짜의 데이터 무효화
      if (previousDate && previousDate !== newDate) {
        const prevYear = new Date(previousDate).getFullYear();
        const prevMonth = new Date(previousDate).getMonth() + 1;
        if (prevYear !== year || prevMonth !== month) {
          queryClient.invalidateQueries({
            queryKey: [
              QUERY_KEY.MONTHLY_TODOS,
              { year: prevYear, month: prevMonth },
            ],
          });
        }
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEY.DAILY_TODOS, previousDate],
        });
      }

      // 데이터 순서가 꼬이는 이슈가 있어서 수정 시 모든 데이터 무효화
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.MONTHLY_TODOS, { year, month }],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.DAILY_TODOS, newDate],
      });
    },
  });
};

export const useDeleteTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (todoId: number) => deleteTodo(todoId),
    onSuccess: ({ todoId }) => {
      let previousDate: string | null = null;

      queryClient
        .getQueryCache()
        .findAll({ queryKey: [QUERY_KEY.DAILY_TODOS] })
        .forEach((query) => {
          const todos = query.state.data as Todo[];
          const foundTodo = todos.find((todo) => todo.todoId === todoId);
          if (foundTodo) {
            previousDate = foundTodo.date;
          }
        });

      if (previousDate) {
        const year = new Date(previousDate).getFullYear();
        const month = new Date(previousDate).getMonth() + 1;

        // 해당 날짜의 캐시에서 삭제된 할 일 제거
        queryClient.setQueryData<Todo[]>(
          [QUERY_KEY.DAILY_TODOS, previousDate],
          (oldTodos) =>
            oldTodos ? oldTodos.filter((todo) => todo.todoId !== todoId) : [],
        );

        // 한 달 단위의 데이터를 무효화하여 최신 데이터 유지
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEY.MONTHLY_TODOS, { year, month }],
        });
      }
    },
  });
};
