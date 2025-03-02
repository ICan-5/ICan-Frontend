import { NextRequest, NextResponse } from 'next/server';
import { fetchIntance } from '@/services/fetchInstance';

export async function PATCH(
  req: NextRequest,
  { params }: { params: { todoId: number } },
) {
  const { todoId } = params;
  const body = await req.json();
  const { title, goalId, date, done } = body;

  if (!title && goalId === undefined && done === undefined && !date) {
    return NextResponse.json(
      { message: 'title, goalId, done, date are required' },
      { status: 400 },
    );
  }

  const res1 = await fetchIntance({
    base: 'CODEIT',
    method: 'PATCH',
    url: `/todos/${todoId}`,
    body: { title, goalId, done },
  });

  if (!res1.ok) {
    return res1;
  }

  const res2 = await fetchIntance({
    url: `/todos/${todoId}`,
    method: 'PATCH',
    body: {
      goalId,
      date,
      done,
      title,
    },
  });

  return res2;
}
