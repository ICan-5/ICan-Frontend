'use server';

import { getErrorMessage } from '@/constants/errorMessages';
import { fetchIntance } from './fetchInstance';

export const fetchTodoBasket = async () => {
  const res = await fetchIntance({
    method: 'GET',
    url: '/calendar/todo-basket',
  });
  if (!res.ok) throw new Error(getErrorMessage(res.status));

  return res.json();
};

export const addTodoBasket = async (title: string) => {
  const res = await fetchIntance({
    method: 'POST',
    url: '/calendar/todo-basket',
    body: { title },
  });

  if (!res.ok) throw new Error(getErrorMessage(res.status));
  const data = await res.json();

  return data;
};

export const deleteTodoBasket = async (basketTodoId: number) => {
  const res = await fetchIntance({
    method: 'DELETE',
    url: `/calendar/todo-basket/${basketTodoId}`,
  });
  if (!res.ok) throw new Error(getErrorMessage(res.status));

  return basketTodoId;
};
