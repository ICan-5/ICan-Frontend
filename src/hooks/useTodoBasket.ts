import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEY } from '@/constants/queryKey';
import { addTodoBasket, fetchTodoBasket } from '@/services/basket';

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

export const useTodoBasketLists = () => {
  return useQuery<Basket[]>({
    queryKey: [QUERY_KEY.TODO_BASKET],
    queryFn: fetchTodoBasketClient,
  });
};

export const useAddTodoBasket = () => {
  const queryClinet = useQueryClient();

  return useMutation({
    mutationFn: addTodoBasketClient,
    onSuccess: (newTodo) => {
      queryClinet.setQueryData([QUERY_KEY.TODO_BASKET], (oldData: Basket[]) => {
        if (!oldData) return [newTodo];
        return [...oldData, newTodo];
      });
    },
  });
};
