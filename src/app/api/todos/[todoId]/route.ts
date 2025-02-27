import { NextRequest, NextResponse } from 'next/server';
import { getErrorMessage } from '@/constants/errorMessages';
import { fetchIntance } from '@/services/fetchInstance';

export async function PATCH(
  req: NextRequest,
  { params }: { params: { todoId: number } },
) {
  const { todoId } = params;
  const body = await req.json();
  const { title, goalId, date, done } = body;
  console.log(goalId);

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
    const message = getErrorMessage(res1.status);
    return NextResponse.json({ message }, { status: res1.status });
  }

  const res2 = await fetchIntance({
    base: 'BACKEND',
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
