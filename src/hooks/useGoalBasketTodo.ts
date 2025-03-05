import { useMutation, useQueryClient } from '@tanstack/react-query';
import { BasketFormValues } from '@/components/goalDetail/BasketCreateTodo';
import { addBasket, deleteBasket } from '@/services/basket';
import { QUERY_KEY } from '@/constants/queryKey';

export const useAddBasketTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (formData: BasketFormValues) => addBasket(formData),

    onSuccess: (newBasket) => {
      const { goalId } = newBasket;

      if (goalId === undefined) {
        console.error('goalId가 없습니다.');
        return;
      }

      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.GOAL_TODOS, goalId],
      });
    },
  });
};

export const useDeleteBasketTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (basketTodoId: number) => deleteBasket(basketTodoId),

    onSuccess: (_, _basketTodoId) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.GOAL_TODOS],
        refetchType: 'active',
      });
    },
  });
};
