import { getErrorMessage } from '@/constants/errorMessages';
import { BasketFormValues } from '@/components/goalDetail/BasketCreateTodo';

// 장바구니 추가
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

/**
 * 장바구니 삭제
 * @param basketTodoId 장바구니 할일 id
 */
export const deleteBasket = async (basketTodoId: number) => {
  try {
    const response = await fetch(`/api/baskets/${basketTodoId}`, {
      method: 'DELETE',
    });

    if (!response.ok) throw new Error(getErrorMessage(response.status));

    return { basketTodoId };
  } catch (error) {
    console.error('할 일 삭제 중 오류 발생:', error);
    throw error;
  }
};
