import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEY } from '@/constants/queryKey';
import {
  addTodoBasket,
  deleteAllTodoBasket,
  deleteTodoBasket,
  fetchTodoBasket,
} from '@/services/basket';

interface Basket {
  id: number;
  title: string;
  goalId: number;
  createdAt: string;
}

const fetchTodoBasketClient = async () => {
  return fetchTodoBasket();
};

const addTodoBasketClient = async (title: string) => {
  return addTodoBasket(title);
};

const deleteTodoBasketClient = async (basketTodoId: number) => {
  return deleteTodoBasket(basketTodoId);
};

const deleteAllTdooBasketClient = async () => {
  return deleteAllTodoBasket();
};

export const useTodoBasketLists = () => {
  return useQuery<Basket[]>({
    queryKey: [QUERY_KEY.TODO_BASKET],
    queryFn: fetchTodoBasketClient,
  });
};

export const useAddTodoBasket = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addTodoBasketClient,
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
    mutationFn: deleteTodoBasketClient,
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
    mutationFn: deleteAllTdooBasketClient,
    onSuccess: () => {
      queryClient.setQueryData([QUERY_KEY.TODO_BASKET], []);
    },
  });
};
