import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Todo, Basket } from '@/types/todos';
import { TodoFormValues } from '@/components/todoCalendar/CreateTodo';
import { addTodo, updateGoalTodo } from '@/services/todo';
import { QUERY_KEY } from '@/constants/queryKey';

interface GoalTodoData {
  todos: Todo[];
  basketTodos: Basket[];
}

interface GoalTodoResponse {
  todos: Todo[];
  basketTodos: Basket[];
  todoItems: Todo[];
  doneItems: Todo[];
  isLoading: boolean;
  error: Error | null;
}

interface UpdateTodoParams {
  todoId: number;
  goalId: number;
  title?: string;
  date?: string;
}

export const useGoalTodo = (goalId: number): GoalTodoResponse => {
  const {
    data: queryData,
    isLoading,
    error,
  } = useQuery<GoalTodoData, Error>({
    queryKey: [QUERY_KEY.GOAL_TODOS, goalId],
    queryFn: async () => {
      const url = `/api/goals/${goalId}/todos`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Failed to fetch todos for goal ${goalId}`);
      }

      const data = await response.json();
      return {
        todos: Array.isArray(data.todos) ? data.todos : [],
        basketTodos: Array.isArray(data.basketTodos) ? data.basketTodos : [],
      };
    },
  });

  const todoItems = queryData?.todos.filter((item) => !item.done) || [];
  const doneItems = queryData?.todos.filter((item) => item.done) || [];

  return {
    todos: queryData?.todos || [],
    basketTodos: queryData?.basketTodos || [],
    todoItems,
    doneItems,
    isLoading,
    error: error || null,
  };
};

export const useToggleTodo = (goalId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ todoId, todo }: { todoId: number; todo: Todo }) => {
      const updatedFields = {
        done: !todo.done,
        goalId: todo.goal ? todo.goal.goalId : undefined,
        title: todo.title,
        date: todo.date,
      };

      const response = await fetch(`/api/goals/${goalId}/todos/${todoId}`, {
        method: 'PATCH',
        body: JSON.stringify(updatedFields),
      });

      if (!response.ok) {
        throw new Error('Failed to update todo');
      }

      return response.json();
    },
    onMutate: async ({ todoId }) => {
      await queryClient.cancelQueries({
        queryKey: [QUERY_KEY.GOAL_TODOS, goalId],
      });
      const previousData = queryClient.getQueryData<GoalTodoData>([
        QUERY_KEY.GOAL_TODOS,
        goalId,
      ]);
      if (previousData && previousData.todos) {
        const updatedTodos = previousData.todos.map((todo) =>
          todo.todoId === todoId ? { ...todo, done: !todo.done } : todo,
        );

        queryClient.setQueryData<GoalTodoData>([QUERY_KEY.GOAL_TODOS, goalId], {
          ...previousData,
          todos: updatedTodos,
        });
      }

      return { previousData };
    },
    onError: (err, variables, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(
          [QUERY_KEY.GOAL_TODOS, goalId],
          context.previousData,
        );
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.GOAL_TODOS, goalId],
      });
    },
  });
};

export const useGoalAddTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (formData: TodoFormValues) => {
      const date = formData.date ?? new Date();
      return addTodo({
        ...formData,
        date,
      });
    },
    onSuccess: (newTodo) => {
      const { goalId } = newTodo;
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.GOAL_TODOS, goalId],
      });
    },
  });
};

export const useUpdateGoalTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ todoId, goalId, title, date }: UpdateTodoParams) => {
      return updateGoalTodo(todoId, goalId, { title, date });
    },
    onMutate: async ({ todoId, goalId, title, date }) => {
      await queryClient.cancelQueries({
        queryKey: [QUERY_KEY.GOAL_TODOS, goalId],
      });

      const previousData = queryClient.getQueryData<{ todos: Todo[] }>([
        QUERY_KEY.GOAL_TODOS,
        goalId,
      ]);

      if (previousData) {
        const updatedTodos = previousData.todos.map((todo) =>
          todo.todoId === todoId
            ? { ...todo, title: title ?? todo.title, date: date ?? todo.date }
            : todo,
        );

        queryClient.setQueryData([QUERY_KEY.GOAL_TODOS, goalId], {
          ...previousData,
          todos: updatedTodos,
        });
      }

      return { previousData };
    },
    onError: (err, variables, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(
          [QUERY_KEY.GOAL_TODOS, variables.goalId],
          context.previousData,
        );
      }
    },
    onSettled: (_, __, { goalId }) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.GOAL_TODOS, goalId],
      });
    },
  });
};
