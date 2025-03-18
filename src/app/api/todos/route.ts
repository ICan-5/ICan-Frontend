import { NextRequest } from 'next/server';
import { fetchInstance } from '@/services/fetchInstance';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { title, goalId, date } = body;

  const res1 = await fetchInstance({
    base: 'CODEIT',
    method: 'POST',
    url: '/todos',
    body: { title, goalId },
  });

  if (!res1.ok) {
    return res1;
  }

  const data = await res1.json();
  const { id, createdAt } = data;

  const res2 = await fetchInstance({
    base: 'BACKEND',
    url: '/todos',
    method: 'POST',
    body: {
      todoId: id,
      goalId: goalId ?? null,
      date,
      done: false,
      title,
      createdAt,
    },
  });

  return res2;
}
