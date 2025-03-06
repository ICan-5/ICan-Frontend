import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEY } from '@/constants/queryKey';
import { getErrorMessage } from '@/constants/errorMessages';

interface Basket {
  id: number;
  title: string;
  goalId: number;
  createdAt: string;
}

const fetchTodoBasket = async () => {
  const res = await fetch(`/api/basket`);
  if (!res.ok) throw new Error(getErrorMessage(res.status));

  return res.json();
};

const addTodoBasket = async ({
  title,
  goalId,
}: {
  title: string;
  goalId?: number | null;
}) => {
  const res = await fetch('/api/basket', {
    method: 'POST',
    body: JSON.stringify({ title, goalId }),
  });
  if (!res.ok) throw new Error(getErrorMessage(res.status));

  return res.json();
};

const deleteTodoBasket = async (basketTodoId: number) => {
  const res = await fetch(`/api/basket/${basketTodoId}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error(getErrorMessage(res.status));

  return basketTodoId;
};

const deleteAllTodoBasket = async () => {
  const res = await fetch('/api/basket', {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error(getErrorMessage(res.status));
};

export const useTodoBasketLists = () => {
  return useQuery<Basket[]>({
    queryKey: [QUERY_KEY.TODO_BASKET],
    queryFn: fetchTodoBasket,
  });
};

export const useAddTodoBasket = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addTodoBasket,
    onSuccess: (newTodo) => {
      queryClient.setQueryData([QUERY_KEY.TODO_BASKET], (oldData: Basket[]) => {
        if (!oldData) return [newTodo];
        return [...oldData, newTodo];
      });
    },
  });
};

export const useDeleteTodoBasket = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteTodoBasket,
    onSuccess: (deletedId: number) => {
      queryClient.setQueryData([QUERY_KEY.TODO_BASKET], (oldData: Basket[]) => {
        return oldData.filter((todo) => todo.id !== deletedId);
      });
    },
  });
};

export const useDeleteAllTodoBasket = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteAllTodoBasket,
    onSuccess: () => {
      queryClient.setQueryData([QUERY_KEY.TODO_BASKET], []);
    },
  });
};
