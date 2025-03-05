import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEY } from '@/constants/queryKey';
import { addTodoBasket, fetchTodoBasket } from '@/services/basket';

interface Basket {
  id: number;
  title: string;
  goalId: number;
  createdAt: string;
}

export const useTodoBasketLists = () => {
  return useQuery<Basket[]>({
    queryKey: [QUERY_KEY.TODO_BASKET],
    queryFn: () => fetchTodoBasket(),
  });
};

export const useAddTodoBasket = () => {
  const queryClinet = useQueryClient();

  return useMutation({
    mutationFn: (title: string) => addTodoBasket(title),
    onSuccess: () => {
      queryClinet.invalidateQueries({ queryKey: [QUERY_KEY.TODO_BASKET] });
    },
  });
};
