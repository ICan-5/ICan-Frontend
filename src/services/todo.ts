import { TodoFormValues } from '@/components/todoCalendar/CreateTodo';
import { getErrorMessage } from '@/constants/errorMessages';
import { Todo } from '@/types/todos';

/**
 * 할 일 생성
 */
export const addTodo = async (formData: TodoFormValues) => {
  try {
    const response = await fetch('/api/todos', {
      method: 'POST',
      body: JSON.stringify({
        title: formData.title,
        goalId: formData.goal?.goalId,
        date: formData.date.toLocaleDateString('sv-SE'),
      }),
    });

    if (!response.ok) throw new Error(getErrorMessage(response.status));
    const data = await response.json();
    return data;
  } catch (error) {
    console.log('할 일 생성 중 오류 발생', error);
    throw error;
  }
};

/**
 * 할 일 수정
 * @param todoId 할 일 id
 * @param updatedFields 수정할 필드
 */
export const updateTodo = async (
  todoId: number,
  updatedFields: Partial<Todo>,
) => {
  try {
    const body = {
      ...updatedFields,
      goalId: updatedFields.goal?.goalId || null,
    };
    const response = await fetch(`/api/todos/${todoId}`, {
      method: 'PATCH',
      body: JSON.stringify(body),
    });

    if (!response.ok) throw new Error(getErrorMessage(response.status));
    const data = await response.json();
    return data;
  } catch (error) {
    console.log('할 일 수정 중 오류 발생', error);
    throw error;
  }
};

/**
 * 목표별 할 일 수정
 * @param todoId 할 일 id
 * @param updatedFields 수정할 필드
 */
export const updateGoalTodo = async (
  todoId: number,
  goalId: number,
  updatedFields: Partial<Todo>,
) => {
  try {
    const body = {
      ...updatedFields,
      goalId: updatedFields.goal?.goalId || null,
    };
    const response = await fetch(`/api/goals/${goalId}/todos/${todoId}`, {
      method: 'PATCH',
      body: JSON.stringify(body),
    });

    if (!response.ok) throw new Error(getErrorMessage(response.status));
    const data = await response.json();
    return data;
  } catch (error) {
    console.log('할 일 수정 중 오류 발생', error);
    throw error;
  }
};

/**
 * 할 일 삭제
 * @param todoId 할 일 id
 */
export const deleteTodo = async (todoId: number) => {
  try {
    const response = await fetch(`/api/todos/${todoId}`, {
      method: 'DELETE',
    });

    if (!response.ok) throw new Error(getErrorMessage(response.status));

    return { todoId };
  } catch (error) {
    console.error('할 일 삭제 중 오류 발생:', error);
    throw error;
  }
};
