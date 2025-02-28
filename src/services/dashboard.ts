'use server';

import { getErrorMessage } from '@/constants/errorMessages';
import { fetchIntance } from './fetchInstance';

const date = new Date().toLocaleDateString('sv-SE');

export const getTodayProgress = async () => {
  try {
    const res = await fetchIntance({
      base: 'BACKEND',
      method: 'GET',
      url: `/dashboard/todo-stats?date=${date}`,
    });

    if (!res.ok) throw new Error(getErrorMessage(res.status));

    const data: { date: string; total: number; completed: number } =
      await res.json();
    return data;
  } catch {
    return { date: '', total: 0, completed: 0 };
  }
};
