import { NextRequest } from 'next/server';
import { fetchIntance } from '@/services/fetchInstance';

export async function GET(
  req: NextRequest,
  { params }: { params: { goalId: string } },
) {
  const goalId = Number(params.goalId);
  const res = await fetchIntance({
    method: 'GET',
    url: `/goals/${goalId}`,
  });

  return res;
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { title, goalId, date } = body;

  const res1 = await fetchIntance({
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

  const res2 = await fetchIntance({
    url: '/todos',
    method: 'POST',
    body: {
      todoId: id,
      goalId,
      date,
      done: false,
      title,
      createdAt,
    },
  });
  return res2;
}
