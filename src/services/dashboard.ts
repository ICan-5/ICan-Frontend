'use server';

import { getErrorMessage } from '@/constants/errorMessages';
import { fetchInstance } from './fetchInstance';
import { Grass } from '@/types/dashboard';

export const getTodayProgress = async () => {
  try {
    const date = new Date().toLocaleDateString('sv-SE');

    const res = await fetchInstance({
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

export const getTodoGrass = async () => {
  try {
    const year = new Date().getFullYear();
    const res = await fetchInstance({
      base: 'BACKEND',
      method: 'GET',
      url: '/dashboard/jandi',
      params: { year },
    });

    if (!res.ok) throw new Error(getErrorMessage(res.status));

    const data: Grass[] = await res.json();
    return data;
  } catch {
    return [];
  }
};
