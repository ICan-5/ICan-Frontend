import { useMutation, useQueryClient } from '@tanstack/react-query';
import { BasketFormValues } from '@/components/goalDetail/BasketCreateTodo';
import { addBasket } from '@/services/basket';
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
