import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Todo, Basket } from '@/types/todos';

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
  toggleTodo: (todoId: number) => Promise<void>;
}

export const useGoalTodo = (goalId: string): GoalTodoResponse => {
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery<GoalTodoData, Error>({
    queryKey: ['goalTodos', goalId],
    queryFn: async () => {
      const url = `/api/goals/${goalId}/todos`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Failed to fetch todos for goal ${goalId}`);
      }

      // eslint-disable-next-line @typescript-eslint/no-shadow
      const data = await response.json();
      return {
        todos: Array.isArray(data.todos) ? data.todos : [],
        basketTodos: Array.isArray(data.basketTodos) ? data.basketTodos : [],
      };
    },
  });

  const toggleTodoMutation = useMutation({
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
        queryKey: ['goalTodos', goalId],
      });
      const previousData = queryClient.getQueryData<GoalTodoData>([
        'goalTodos',
        goalId,
      ]);
      if (previousData && previousData.todos) {
        const updatedTodos = previousData.todos.map((todo) =>
          todo.todoId === todoId ? { ...todo, done: !todo.done } : todo,
        );

        queryClient.setQueryData<GoalTodoData>(['goalTodos', goalId], {
          ...previousData,
          todos: updatedTodos,
        });
      }

      return { previousData };
    },
    onError: (err, variables, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(['goalTodos', goalId], context.previousData);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ['goalTodos', goalId],
      });
    },
  });

  const toggleTodo = async (todoId: number) => {
    const todo = data?.todos.find((t) => t.todoId === todoId);
    if (!todo) return;

    await toggleTodoMutation.mutateAsync({ todoId, todo });
  };

  const todoItems = data?.todos.filter((item) => !item.done) || [];
  const doneItems = data?.todos.filter((item) => item.done) || [];

  return {
    todos: data?.todos || [],
    basketTodos: data?.basketTodos || [],
    todoItems,
    doneItems,
    isLoading,
    error: error || null,
    toggleTodo,
  };
};
