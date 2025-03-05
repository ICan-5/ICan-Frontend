import { NextRequest } from 'next/server';
import { fetchIntance } from '@/services/fetchInstance';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { title, goalId, id } = body;

  const res = await fetchIntance({
    url: '/calendar/todo-basket',
    method: 'POST',
    body: {
      id,
      goalId,
      title,
    },
  });

  return res;
}
