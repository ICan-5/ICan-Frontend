import { getErrorMessage } from '@/constants/errorMessages';
import { BasketFormValues } from '@/components/goalDetail/BasketCreateTodo';

export const addBasket = async (formData: BasketFormValues) => {
  try {
    const response = await fetch('/api/baskets', {
      method: 'POST',
      body: JSON.stringify({
        title: formData.title,
        goalId: formData.goal.goalId,
      }),
    });

    if (!response.ok) throw new Error(getErrorMessage(response.status));

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('할 일 생성 중 오류 발생', error);
    throw error;
  }
};
