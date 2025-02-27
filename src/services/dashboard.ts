'use server';

import { getErrorMessage } from '@/constants/errorMessages';
import { fetchIntance } from './fetchInstance';
import { Todo } from '@/types/todos';

const date = new Date().toISOString().split('T')[0];

export const getTodayList = async () => {
  const res = await fetchIntance({
    base: 'BACKEND',
    method: 'GET',
    url: `/calendar/daily-todos?date=${date}`,
  });
  if (!res.ok) throw new Error(getErrorMessage(res.status));

  try {
    // 오늘 할일 중 원하는 데이터만 추출

    const data: Todo[] = await res.json();
    const completedTodos = data
      .filter((todo) => todo.done)
      .map(({ todoId, noteId, title }) => ({ todoId, noteId, title }));

    return completedTodos;
  } catch {
    throw new Error('오늘의 할일 데이터 가공하는 중에 에러가 발생했습니다.');
  }
};

export const getTodayProgress = async () => {
  const res = await fetchIntance({
    base: 'BACKEND',
    method: 'GET',
    url: `/dashboard/todo-stats?date=${date}`,
  });

  if (!res.ok) throw new Error(getErrorMessage(res.status));
  try {
    const data: { date: string; total: number; completed: number } =
      await res.json();
    return data;
  } catch {
    throw new Error('오늘의 할일 진행도를 불러오는 중에 에러가 발생했습니다.');
  }
};
